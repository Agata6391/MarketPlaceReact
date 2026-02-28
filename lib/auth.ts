// lib/auth.ts

import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        // OLD:
        // const user = await UserModel.findOne({ email: credentials.email }).select("+password");
        //
        // NEW: include moderation fields so admin actions (ban/suspend/delete) actually block login
        const user = await UserModel.findOne({ email: credentials.email }).select(
          "+password role status suspendedUntil deletedAt avatar name email"
        );

        if (!user || !user.password) return null;

       // NEW: block if deleted / banned / suspended (with explicit error codes)
if ((user as any).deletedAt) throw new Error("ACCOUNT_DELETED");

if ((user as any).status === "banned") throw new Error("ACCOUNT_BANNED");

if ((user as any).status === "suspended") {
  const until = (user as any).suspendedUntil as Date | undefined;
  if (!until) throw new Error("ACCOUNT_SUSPENDED");
  if (until > new Date()) throw new Error(`ACCOUNT_SUSPENDED_UNTIL:${until.toISOString()}`);
}

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: (user as any).role,
          image: (user as any).avatar,
          status: (user as any).status ?? "active", // NEW: include status
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // OLD:
      // if (user) {
      //   token.role = (user as any).role ?? "buyer";
      //   token.id = user.id;
      // }

      // NEW: keep initial assignment, plus status
      if (user) {
        token.role = (user as any).role ?? "buyer";
        token.id = (user as any).id;
        (token as any).status = (user as any).status ?? "active";
      }

      // Google OAuth (same behavior, but also store status)
      if (account?.provider === "google" && profile) {
        await connectDB();

        // OLD:
        // const existing = await UserModel.findOne({ email: token.email });
        //
        // NEW: include role/status/deletedAt/suspendedUntil for gating + sync
        const existing = await UserModel.findOne({ email: token.email }).select(
          "role status suspendedUntil deletedAt"
        );

        // NEW: if blocked, do not elevate
        if (existing) {
          if ((existing as any).deletedAt) return token;
          if ((existing as any).status === "banned") return token;
          if ((existing as any).status === "suspended") {
            const until = (existing as any).suspendedUntil as Date | undefined;
            if (!until) return token;
            if (until > new Date()) return token;
          }
        }

        if (!existing) {
          const newUser = await UserModel.create({
            name: token.name,
            email: token.email,
            avatar: (token as any).picture,
            provider: "google",
            role: "buyer",
            status: "active",
          });

          token.id = newUser._id.toString();
          token.role = "buyer";
          (token as any).status = "active";
        } else {
          token.id = existing._id.toString();
          token.role = (existing as any).role ?? "buyer";
          (token as any).status = (existing as any).status ?? "active";
        }
      }

      // NEW (critical): always sync role/status from DB so role changes take effect immediately
      if (token.email) {
        await connectDB();
        const dbUser = await UserModel.findOne({ email: token.email }).select(
          "role status suspendedUntil deletedAt"
        );

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = (dbUser as any).role ?? "buyer";
          (token as any).status = (dbUser as any).status ?? "active";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).status = (token as any).status as string; // NEW
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);