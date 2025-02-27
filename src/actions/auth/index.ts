'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';

import { AuthError } from 'next-auth';

import { getConfig } from '@/actions';
import { signOut } from '@/auth';
import { ApiResponse, makeApiRequest } from '@/lib/api';
import {
    AccountVerificationError,
    CustomError,
    ERROR_CODE_ACCOUNT_VERIFICATION_PENDING,
    InvalidCredentialsError,
    OtpInvalidError,
    OtpRequiredError,
    ServerError,
} from '@/lib/errors';
import {
    ForgotPasswordSchema,
    PasswordUpdateFormInterface,
    SignInSchema,
    signInSchema,
    signUpSchema,
    SignUpSchema,
    UserInterface,
} from '@/lib/zod';
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
        //
        // await signIn('credentials', {
        //     email: parsedCredentials.data.email,
        //     otp: parsedCredentials.data.otp,
        //     password: parsedCredentials.data.password,
        //     redirect: true,
        //     redirectTo: callbackUrl,
        //     remember: parsedCredentials.data.remember,
        // });

        return { success: false, error: { message: 'Login is currently disabled, Try again later.' } };
    } catch (e: unknown) {
        if (isRedirectError(e)) throw e;
        const nextError = e as AuthError;
        const error = nextError.cause?.err as CustomError;

        if (error && (
            error instanceof InvalidCredentialsError
            || error instanceof OtpRequiredError
            || error instanceof AccountVerificationError
            || error instanceof OtpInvalidError
            || error instanceof ServerError
        )) {
            return { success: false, error: { message: error.message, code: error.code } };
        }

        return { success: false, error: { message: error.errors?.[0] || 'An unexpected error occurred.' } };
    }
}

export async function doRegister(formData: SignUpSchema, callbackUrl = DEFAULT_LOGIN_REDIRECT) {
    const config = await getConfig();

    try {
        const parsedCredentials = signUpSchema.safeParse(formData);

        if (!parsedCredentials.success) {
            return {
                success: false,
                error: { message: parsedCredentials.error.message, details: parsedCredentials.error.errors },
            };
        }

        const { email, password } = parsedCredentials.data;

        const payload = {
            data: JSON.stringify({ language: 'en' }),
            email: email,
            password: password,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${config['authEndPoint']}/identity/users`, {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const resBody = await response.json();

        if (response.ok) {
            const user = resBody as UserInterface;

            if (user.state === 'pending') {
                return {
                    success: false,
                    error: {
                        message: 'Account verification is required',
                        code: ERROR_CODE_ACCOUNT_VERIFICATION_PENDING,
                    },
                };
            }

            await doLogin({ email, password, remember: false }, callbackUrl);
        }

        if (resBody.errors && Array.isArray(resBody.errors)) {
            if (resBody.errors.includes('identity.captcha.required')) {
                return { success: false, error: { message: 'Captcha is required' } };
            }
            if (resBody.errors.includes('email.taken')) {
                return { success: false, error: { message: 'Email is already taken' } };
            }

            return { success: false, error: { message: resBody.errors[0] } };
        }

    } catch (e: unknown) {
        if (isRedirectError(e)) throw e;

        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}

export async function doLogout(path = '/') {
    try {
        await signOut({ redirectTo: path, redirect: true });
    } catch (e: unknown) {
        if (isRedirectError(e)) throw e;
        console.error('Redirect error', e);

        return { success: false, error: { message: 'An unexpected error occurred.' } };
    }
}

export async function updatePassword(payload: PasswordUpdateFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: '/resource/users/password',
        method: 'PUT',
        pathToRevalidate: ['/account/settings'],
        payload,
    });
}

export async function verifyEmailToken(payload: { token: string }): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: '/identity/users/email/confirm_code',
        isPublic: true,
        method: 'POST',
        pathToRevalidate: ['/account/confirmation'],
        payload,
    });
}

export async function resendEmailToken(payload: { email: string }): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: '/identity/users/email/generate_code',
        isPublic: true,
        method: 'POST',
        payload,
    });
}

export async function generateForgetPasswordToken(payload: { email: string }): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: '/identity/users/password/generate_code',
        isPublic: true,
        method: 'POST',
        payload,
    });
}

export async function verifyForgetPasswordToken(payload: ForgotPasswordSchema): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: '/identity/users/password/confirm_code',
        isPublic: true,
        method: 'POST',

        payload: {
            confirm_password: payload.confirm_password,
            password: payload.new_password,
            reset_password_token: payload.reset_token,
        },
    });
}

export async function fetchAbilities(): Promise<ApiResponse> {
    return { data: { manage: ['all'] }, error: null, success: true };
    // return await makeApiRequest({
    //     endpoint: '/abilities/user',
    //     apiVersion: 'barong',
    //     method: 'GET',
    // });
}
