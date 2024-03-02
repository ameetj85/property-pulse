import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign-in
    async signIn({ profile }) {
      // 1. connect to mongo db
      // 2. Check if user exists
      // 3. If not exists then add to db
      // 4. Return true to allow sign in
    },
    // Modifies the session object
    async session({ session }) {
      // 1. get user  from mongo
      // 2. assign user id to the session
      // 3. return the session
    },
  },
};
