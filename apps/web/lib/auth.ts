import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { DynamoDBAdapter } from "@auth/dynamodb-adapter";
import { dynamo } from "@/lib/dynamodb";
import { randomBytes } from "crypto";
import { UsersService } from "@/lib/users";
import { EmailService } from "@/lib/email";

export const authOptions: NextAuthOptions = {
  adapter: DynamoDBAdapter(dynamo, {
    tableName: `${process.env.DYNAMODB_TABLE_PREFIX ?? "storyloom_"}auth`,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
      generateVerificationToken: () => randomBytes(32).toString("hex"),
      sendVerificationRequest: async ({ identifier, url }) => {
        const emailOptions = EmailService.generateMagicLinkEmail(identifier, url);
        await EmailService.sendEmail(emailOptions);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        Object.assign(token, {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        Object.assign(session.user, {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
          image: token.image as string,
        });
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        const email = user.email;
        if (!email) return true;

        const signInMethod = account?.provider === "google" ? "google" : "email";
        const existingUser = await UsersService.getUserByEmail(email);

        if (existingUser?.signInMethods?.length) {
          const hasCurrentMethod = existingUser.signInMethods.includes(signInMethod);
          if (!hasCurrentMethod) {
            const originalMethod = existingUser.signInMethods[0];
            throw new Error(
              originalMethod === "google" ? "GoogleAccountRequired" : "EmailAccountRequired"
            );
          }
        }

        const name = user.name ?? email.split("@")[0];
        const result = await UsersService.createOrUpdateUser({
          id: user.id,
          email,
          name,
          image: user.image || undefined,
          signInMethod,
        });

        if (result.isNewUser) {
          Promise.resolve().then(async () => {
            try {
              await EmailService.sendWelcomeEmail(email, name);
              console.log("Welcome email sent to new user:", email);
            } catch (e) {
              console.error("Failed to send welcome email:", e);
            }
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        if (error instanceof Error && ["GoogleAccountRequired", "EmailAccountRequired"].includes(error.message)) {
          throw error;
        }
        return true;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};
