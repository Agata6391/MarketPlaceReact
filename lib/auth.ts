import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/User";

// async function verifyHCaptcha(token: string) {
//   const secret = process.env.HCAPTCHA_SECRET;

//   if (!secret) {
//     throw new Error("Missing HCAPTCHA_SECRET");
//   }

//   const response = await fetch("https://hcaptcha.com/siteverify", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       secret,
//       response: token,
//     }),
//   });

//   const data = await response.json();
//   return data.success === true;
// }

async function verifyHCaptcha(token: string) {
  const secret = process.env.HCAPTCHA_SECRET;

 

  if (!secret) {
    throw new Error("Missing HCAPTCHA_SECRET");
  }

  try {
    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    const data = await response.json();
    console.log("[HCAPTCHA] verify response:", data);

    return data.success === true;
  } catch (error) {
    console.error("[HCAPTCHA] verify request failed:", error);
    return false;
  }
}

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
        hcaptchaToken: { label: "hCaptcha Token", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (!credentials?.hcaptchaToken) {
          throw new Error("HCAPTCHA_REQUIRED");
        }

        const captchaOk = await verifyHCaptcha(credentials.hcaptchaToken);
        if (!captchaOk) {
          throw new Error("HCAPTCHA_FAILED");
        }

        await connectDB();

        const user = await UserModel.findOne({ email: credentials.email }).select(
          "+password role status suspendedUntil deletedAt avatar name email"
        );

        if (!user || !user.password) return null;

        if ((user as any).deletedAt) throw new Error("ACCOUNT_DELETED");
        if ((user as any).status === "banned") throw new Error("ACCOUNT_BANNED");

        if ((user as any).status === "suspended") {
          const until = (user as any).suspendedUntil as Date | undefined;
          if (!until) throw new Error("ACCOUNT_SUSPENDED");
          if (until > new Date()) {
            throw new Error(`ACCOUNT_SUSPENDED_UNTIL:${until.toISOString()}`);
          }
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: (user as any).role,
          image: (user as any).avatar,
          status: (user as any).status ?? "active",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = (user as any).role ?? "buyer";
        token.id = (user as any).id;
        (token as any).status = (user as any).status ?? "active";
      }

      if (account?.provider === "google" && profile) {
        await connectDB();

        const existing = await UserModel.findOne({ email: token.email }).select(
          "role status suspendedUntil deletedAt"
        );

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