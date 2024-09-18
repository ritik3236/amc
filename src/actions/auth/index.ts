'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';

import { cookies } from 'next/headers';
import { AuthError } from 'next-auth';

import { signIn, signOut } from '@/auth';
import { AccountVerificationError, CustomError, InvalidCredentialsError, OtpRequiredError } from '@/lib/errors';
import { SignInSchema, signInSchema } from '@/lib/zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function doLogin(formData: SignInSchema, callbackUrl = DEFAULT_LOGIN_REDIRECT) {
    try {
        const parsedCredentials = signInSchema.safeParse(formData);

        if (!parsedCredentials.success) {
            return {
                success: false,
                error: { message: parsedCredentials.error.message, details: parsedCredentials.error.errors },
            };
        }

        await signIn('credentials', {
            redirect: true,
            redirectTo: callbackUrl,
            email: parsedCredentials.data.email,
            password: parsedCredentials.data.password,
            remember: parsedCredentials.data.remember,
        });

        return { success: true, error: null };
    } catch (e: unknown) {
        if (isRedirectError(e)) throw e;
        const nextError = e as AuthError;
        const error = nextError.cause?.err as CustomError;

        if (!error) {
            return { success: false, error: { message: 'An unexpected error occurred.' } };
        }

        if (error instanceof InvalidCredentialsError) {
            return { success: false, error: { message: error.message, details: error.errors } };
        }

        if (error instanceof OtpRequiredError || error instanceof AccountVerificationError) {
            return { success: false, error: { message: error.message, details: error.errors } };
        }

        // Handle unexpected CustomError types
        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}

export async function doLogout() {
    try {
        await signOut({ redirectTo: '/', redirect: true });
        cookies().delete('_barong_session');
    } catch (e: unknown) {
        if (isRedirectError(e)) throw e;
        console.error(e);

        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}
