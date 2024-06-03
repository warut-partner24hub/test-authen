import User from "@/models/User";
import connectMongoDB from "@/utils/connectMongoDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials!.email });
        if (!user) {
          throw new Error("Email is not registered");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Password is incorrect");
        }

        return {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
