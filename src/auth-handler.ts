import { getConfig } from '@/actions';
import { CommonAuthError, errorMap } from '@/lib/errors';
import { getAccessTokenFromHeader } from '@/lib/server-utils';
import { SignInSchema } from '@/lib/zod';

export async function authorize(credentials: SignInSchema) {
    const payload = {
        email: credentials.email,
        password: credentials.password,
        ...(!!credentials.otp && { otp_code: credentials.otp }),
    };

    const config = await getConfig();

    const SESSION_COOKIE_NAME = config['sessionCookieName'];
    const authEndPoint = config['authEndPoint'];

    const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${authEndPoint}/identity/sessions`;

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    console.info('Login - success data', res);

    if (!res.ok) {
        const resBody = await res.json();

        console.error('Login - error data', resBody);
        const errors = resBody.errors || ['Unknown error'];

        errors.forEach((error: string) => {
            if (errorMap[error]) {
                throw new errorMap[error](errors);
            }
        });

        throw new CommonAuthError(errors);
    }

    const tokenObj = getAccessTokenFromHeader(res.headers.get('set-cookie'), SESSION_COOKIE_NAME);

    if (!tokenObj) {
        throw new CommonAuthError(['Access token not found.']);
    }

    const resBody = await res.json();

    return { ...resBody, access_token: tokenObj };
}
