// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE || 'http://localhost:3000',

  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "admin" },
          password: {  label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
          // Add logic here to look up the user from the credentials supplied
          const user = { id: 1, name: credentials.username, email: credentials.username }
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return Promise.resolve(user)
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.resolve(null)
            // You can also Reject this callback with an Error or with a URL:
            // return Promise.reject(new Error('error message')) // Redirect to error page
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        }
      })
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  }
};

export default (req, res) => NextAuth(req, res, options);