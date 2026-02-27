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
        
        const user = await UserModel.findOne({ email: credentials.email }).select("+password");
       

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.avatar,
        };
      },
    }),
  ],

  callbacks: {
    // Persist role in JWT token
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = (user as any).role ?? "buyer";
        token.id = user.id;
      }

      // Auto-create user from Google OAuth on first sign-in
      if (account?.provider === "google" && profile) {
        await connectDB();
        const existing = await UserModel.findOne({ email: token.email });

        if (!existing) {
          const newUser = await UserModel.create({
            name: token.name,
            email: token.email,
            avatar: token.picture,
            provider: "google",
            role: "buyer",
          });
          token.id = newUser._id.toString();
          token.role = "buyer";
        } else {
          token.id = existing._id.toString();
          token.role = existing.role;
        }
      }

      return token;
    },

    // Expose role to session (accessible in client components)
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
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
