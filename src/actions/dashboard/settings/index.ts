'use server';

import { cookies } from 'next/headers';

import { createServerAction, ServerActionError } from '@/lib/server-utils';
import { User } from '@/lib/zod';

export const getProfile = createServerAction<User>(async () => {

    const cookieStore = cookies();
    const barongSession = cookieStore.get('_barong_session')?.value;

    const response = await fetch('https://gamma.coinfinacle.com/api/v2/barong/resource/users/me', {
        headers: {
            'Cookie': `_barong_session=${barongSession}`,
        },
        cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ServerActionError('Unable to fetch profile.');
    }

    return data;
});
