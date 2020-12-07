// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import LoginService from 'src/services/LoginService';

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
          email: { label: "Email", type: "text", placeholder: "admin" },
          password: {  label: "Password", type: "password" }
        },
        authorize: async (credentials) => {
          // Add logic here to look up the user from the credentials supplied
          let user = { };
          let Accepted = false;
          let error = "Failed to login";

          const login = {
            email: credentials.email,
            password: credentials.password
          };

          await LoginService.Login(login)
          .then((res) => {
            if(res.data.role == "Admin")
            {
            user = {id: res.data.id, name: res.data.email, email: res.data.email, image: res.data.token };
            Accepted = true;
            }
            else {
              error = "Unauthorized";
              Accepted = false;
            }
          })
          .catch((error) => {
            Accepted = false;
            error = "Credentials didn't match";
            return Promise.reject(`/login?error=${error}`)
          });

          if (Accepted) {
            // Any object returned will be saved in `user` property of the JWT
            return Promise.resolve(user);
          } else {
            // If you return null or false then the credentials will be rejected
            return Promise.reject(`/login?error=${error}`)
            // You can also Reject this callback with an Error or with a URL:
            //return Promise.reject(user,null,null,false) // Redirect to error page
            //return Promise.resolve(new Error('an error message'))
            // return Promise.reject('/path/to/redirect')        // Redirect to a URL
          }
        }
      })
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/login', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  },
  session: { jwt: true },
};

export default (req, res) => NextAuth(req, res, options);