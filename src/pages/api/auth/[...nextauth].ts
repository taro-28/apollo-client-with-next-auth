import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      authorize: (credentials) => {
        const user = { id: 1, name: "taro", email: "taro@example.com" };

        if (
          // @ts-ignore
          credentials.email === user.email &&
          // @ts-ignore
          credentials.password === "password"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // ログイン時に初めてJWTが生成される時、userオブジェクトが存在します
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user = token;
      return session;
    },
  },
});
