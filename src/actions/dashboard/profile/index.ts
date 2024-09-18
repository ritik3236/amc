'use server';

import { cookies } from 'next/headers';

export const getProfile = async () => {
    const cookieStore = cookies();
    const barongSession = cookieStore.get('_barong_session')?.value;

    const response = await fetch('https://gamma.coinfinacle.com/api/v2/barong/resource/users/me', {
        headers: {
            'Cookie': `_barong_session=${barongSession}`,
        },
        cache: 'no-store',
    });

    return await response.json();
};
