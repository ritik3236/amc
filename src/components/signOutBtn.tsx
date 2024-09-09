import {cookies} from 'next/headers';

import { signOut } from '@/auth';

export function SignOut() {
    return (
        <form
            action={async () => {
                'use server';
                cookies().delete('_barong_session');
                await signOut();
            }}
        >
            <button type="submit">Sign Out</button>
        </form>
    );
}