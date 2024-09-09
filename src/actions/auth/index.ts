'use server';

import {SignInResponse} from 'next-auth/react';

import {z} from 'zod';

import {signIn} from '@/auth';
import {signInSchema} from '@/lib/zod';

export async function doLogin(formData: z.infer<typeof signInSchema>): Promise<SignInResponse> {
    return await signIn('credentials', {
        redirect: true,
        redirectTo: '/',
        email: formData?.email,
        password: formData?.password,
        remember: formData?.remember,
    });
}