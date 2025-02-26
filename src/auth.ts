import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { authorize } from '@/auth-handler';
import { makeApiRequest } from '@/lib/api';
import { encryptToken } from '@/lib/encryption';
import { UserInterface } from '@/lib/zod';

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
                remember: { label: 'Remember', type: 'boolean' },
            },
            authorize,
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: UserInterface | undefined }) {
            if (user) {
                return {
                    ...token,
                    id: user.uid,
                    email: user.email,
                    access_token: await encryptToken(user.access_token.value),
                    csrf_token: await encryptToken(user.csrf_token),
                    name: user.profiles?.[0]?.full_name || user.username || 'N/A',
                };
            }

            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            Object.assign(session.user, {
                id: token.id,
                email: token.email,
                csrf_token: token.csrf_token,
                access_token: token.access_token,
                name: token.name,
            });

            return session;
        },
    },
    events: {
        signOut: async () => {
            await makeApiRequest({
                endpoint: '/identity/sessions',
                apiVersion: 'barong',
                method: 'DELETE',
            });
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
