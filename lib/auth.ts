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
    maxAge: 7 * 24 * 60 * 60, // 7 days — refresh token window
  },

  providers: [
    // ── Google OAuth ──────────────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ── Email / Password ──────────────────────────────────
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        // ─────────────────────────────────────────────────────────
        // OLD:
        // const user = await UserModel.findOne({ email: credentials.email }).select("+password");
        //
        // NEW: also select moderation fields (status, suspendedUntil, deletedAt)
        // ─────────────────────────────────────────────────────────
        const user = await UserModel.findOne({ email: credentials.email }).select(
          "+password status suspendedUntil deletedAt"
        );

        if (!user || !user.password) return null;

        // ─────────────────────────────────────────────────────────
        // NEW: deny login if soft-deleted / banned / suspended
        // Rules:
        // - deletedAt exists => blocked
        // - status === "banned" => blocked
        // - status === "suspended":
        //    - suspendedUntil missing => indefinite suspend => blocked
        //    - suspendedUntil in the future => blocked
        //    - suspendedUntil in the past => allow login
        // ─────────────────────────────────────────────────────────
        if ((user as any).deletedAt) return null;

        if ((user as any).status === "banned") return null;

        if ((user as any).status === "suspended") {
          const until = (user as any).suspendedUntil as Date | undefined;
          if (!until) return null; // indefinite suspend
          if (until > new Date()) return null; // still suspended
        }

        // OLD (kept): password check
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar,

          // ─────────────────────────────────────────────────────────
          // NEW: include status in returned user payload (optional but useful)
          // ─────────────────────────────────────────────────────────
          status: (user as any).status ?? "active",
        };
      },
    }),
  ],

  callbacks: {
    // Persist role in JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = (user as any).role ?? "buyer";
        token.id = (user as any).id;

        // ─────────────────────────────────────────────────────────
        // NEW: persist status into the JWT (optional but useful)
        // ─────────────────────────────────────────────────────────
        token.status = (user as any).status ?? "active";
      }

      // Auto-create user from Google OAuth on first sign-in
      if (account?.provider === "google" && profile) {
        await connectDB();

        // ─────────────────────────────────────────────────────────
        // OLD:
        // const existing = await UserModel.findOne({ email: token.email });
        //
        // NEW: select moderation fields so blocked users can't sign in via Google
        // ─────────────────────────────────────────────────────────
        const existing = await UserModel.findOne({ email: token.email }).select(
          "role status suspendedUntil deletedAt"
        );

        // NEW: if user exists but is blocked, do not allow session
        if (existing) {
          if ((existing as any).deletedAt) return token; // keep token but no id/role update
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
            status: "active", // NEW (explicit)
          });

          token.id = newUser._id.toString();
          token.role = "buyer";
          token.status = "active";
        } else {
          token.id = existing._id.toString();
          token.role = (existing as any).role;
          token.status = (existing as any).status ?? "active";
        }
      }

      return token;
    },

    // Expose role to session (accessible in client components)
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;

        // ─────────────────────────────────────────────────────────
        // NEW: expose status to client session (optional)
        // ─────────────────────────────────────────────────────────
        (session.user as any).status = (token as any).status as string;
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