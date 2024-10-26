import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import Discord from "next-auth/providers/discord"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        Github,
        Google,
        Discord
      ],
      pages: {
        signIn: '/signin',
        newUser: '/onboarding/username'
      },
      callbacks: {
        authorized({ request: { nextUrl }, auth }) {
          const isLoggedIn = !!auth?.user;
          const { pathname } = nextUrl;
          const isOrg = auth?.user.isOrg;
          console.log("logged in : ",isLoggedIn);

          
          if (pathname.startsWith('/signin') && isLoggedIn) {
            if(isOrg === null){
              return Response.redirect(new URL('/onboarding/username', nextUrl));
            }

            return Response.redirect(new URL('/', nextUrl));
          }
    
    
          if (pathname.startsWith("/org") && !isOrg) {
              return Response.redirect(new URL('/', nextUrl));
          }
    
          return !!auth;
        },
        jwt({ token, user, trigger, session }) {
          if (user) {
            token.id = user.id as string;
            token.isOrg = user.isOrg as boolean;
          }
          if (trigger === "update" && session) {
            token = { ...token, ...session };
          }
    
          return token;
        },
        session({ session, token }) {
          session.user.id = token.id;
          session.user.isOrg = token.isOrg;
          return session;
        }
      }
} satisfies NextAuthConfig