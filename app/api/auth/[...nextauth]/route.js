import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        if (email === "" || password === "") {
          console.log("Empty credentials");
          return null;
        }

        try {
          const user = await db.user.findUnique({
            where: { email: email },
            include: { profile: true },
          });

          if (!user) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            image: user.profile?.image || null,
          };
        } catch (err) {
          console.log("Error", err);
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, credentials }) {
    //   console.log("THIS IS UR USER: ", user);
    //   console.log("THIS IS UR ACCOUNT: ", account);
    //   console.log("THIS IS UR PROFILE: ", profile);
    //   console.log("THIS IS UR CREDENTIALS: ", credentials);

    //   if (account.provider === "credentials") {
    //     return true;
    //   }
    //   if (account.provider === "github") {
    //     try {
    //       const existingUser = await db.user.findUnique({
    //         where: { email: user.email },
    //       });
    //       if (!existingUser) {
    //         await db.user.create({
    //           data: {
    //             email: user.email,
    //           },
    //         });
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log(err);
    //       return false;
    //     }
    //   }
    //   if (account.provider === "google") {
    //     try {
    //       const existingUser = await db.user.findUnique({
    //         where: { email: user.email },
    //       });
    //       if (!existingUser) {
    //         await db.user.create({
    //           data: {
    //             email: user.email,
    //           },
    //         });
    //       }
    //       return true;
    //     } catch (err) {
    //       console.log(err);
    //       return false;
    //     }
    //   }
    // },
    async signIn({ user, account, profile, credentials }) {
      // console.log("THIS IS UR USER: ", user);
      // console.log("THIS IS UR ACCOUNT: ", account);
      // console.log("THIS IS UR PROFILE: ", profile);
      // console.log("THIS IS UR CREDENTIALS: ", credentials);

      if (account.provider === "credentials") {
        return true;
      }

      try {
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          const newUser = await db.user.create({
            data: {
              email: user.email,
            },
          });
          user.id = newUser.id;
          // Attach the new user's ID to the user object
        } else {
          user.id = existingUser.id;
          user.role = existingUser.role;
          // Attach the existing user's ID to the user object
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async session({ session, token, user }) {
      if (token?.user) {
        session.user = token.user;
        session.user.id = token.user.id;
        session.role = token.role;
        session.image = token.image;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
