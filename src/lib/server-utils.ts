import { parse } from 'cookie';
import { cookies } from 'next/headers';

export const setAuthCookie = (cookieHeader: string) => {
    if (!cookieHeader) return;

    const parsedCookie = parse(cookieHeader);
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
};
