
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "@/models/User";
// import { connectDB } from "@/lib/db";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         await connectDB();

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) throw new Error("Invalid password");

//         return {
//           id: user._id,
//           email: user.email,
//           name: user.name,
//           role: user.isAdmin ? "admin" : "user", // 🔥 attach role
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user.id;
//         token.role = user.role; // 🔥 attach role to token
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user._id = token._id;
//       session.user.role = token.role; // 🔥 session includes role
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.isAdmin ? "admin" : "user", // ✅ Set role
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id;
        token.role = user.role; // ✅ Add role to token
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role; // ✅ Add role to session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
