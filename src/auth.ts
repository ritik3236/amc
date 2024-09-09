//Todo Update me
import {parse} from 'cookie';
import {cookies} from 'next/headers';
import NextAuth, {CredentialsSignin, NextAuthConfig} from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import {signInSchema} from '@/lib/zod';

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
                remember: {label: 'Remember', type: 'boolean'},
            },
            async authorize(credentials) {
                const parsedCredentials = signInSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.error('Auth.ts|Invalid credentials', parsedCredentials.error);

                    return null;
                }

                const res = await fetch('https://gamma.coinfinacle.com/api/v2/barong/identity/sessions', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email: parsedCredentials.data.email,
                        password: parsedCredentials.data.password,
                    }),
                });

                // console.log('===============Response|auth.ts==================');
                // console.log('res', res);

                if (res.ok) {
                    const user = await res.json();
                    // console.log('===============User|auth.ts==================');
                    // console.log('user', user);

                    const parsedCookie = parse(res.headers.get('set-cookie'));
                    const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];

                    cookies().set({
                        name: cookieName,
                        value: cookieValue,
                        httpOnly: true,
                        maxAge: parseInt(parsedCookie['Max-Age']),
                        path: parsedCookie.path,
                        sameSite: parsedCookie.samesite as any,
                        expires: new Date(parsedCookie.expires),
                        secure: true,
                    });

                    // console.log('===============Cookies|auth.ts==================');
                    // console.log('cookies', cookie);

                    return user;
                } else {
                    throw new InvalidLoginError;
                }
            },
        }),
    ],
    callbacks: {
        async authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;
            // const role = auth?.user.role || 'user';

            if (pathname.startsWith('/login') && isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            // if (pathname.startsWith('/page2') && role !== 'admin') {
            //     return Response.redirect(new URL('/', nextUrl));
            // }

            return !!auth;
        },
        
        async jwt({token, user}) {
            if (user) {
                token.user = user;
            }

            // console.log('===============Callback JWT|auth.ts==================');
            // console.log('token', token);
            // console.log('user', user);

            return token;
        },
        async session({session, token}) {
            // session.user = token.user;

            // console.log('===============Callback session|auth.ts==================');
            // console.log('session', session);
            // console.log('token', token);
            // console.log('===============End|auth.ts==================');

            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
    },
};

export const {handlers, signIn, signOut, auth} = NextAuth(authConfig);
