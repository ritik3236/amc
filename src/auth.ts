import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { AccountVerificationError, InvalidCredentialsError, OtpRequiredError } from '@/lib/errors';
import { setAuthCookie } from '@/lib/server-utils';

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
                remember: { label: 'Remember', type: 'boolean' },
            },
            async authorize(credentials) {
                // return {
                //     id: '23232',
                //     email: credentials.email,
                //     name: 'John Doe',
                //     image: '',
                // } as User;

                const res = await fetch('https://gamma.coinfinacle.com/api/v2/barong/identity/sessions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const resBody = await res.json();

                if (res.ok) {
                    setAuthCookie(res.headers.get('set-cookie'));

                    return resBody;
                } else if (resBody.errors && Array.isArray(resBody.errors)) {
                    if (resBody.errors.includes('identity.session.missing_otp')) {
                        throw new OtpRequiredError(resBody.errors);
                    }
                    if (resBody.errors.includes('identity.session.account_not_verified')) {
                        throw new AccountVerificationError(resBody.errors);
                    }
                    throw new InvalidCredentialsError(resBody.errors);
                } else {
                    throw new InvalidCredentialsError();
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }

            // console.log('===============Callback JWT|auth.ts==================');
            // console.log('token', token);
            // console.log('user', user);

            return token;
        },
        async session({ session, token }) {
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

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
