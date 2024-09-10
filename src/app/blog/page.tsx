import {Link} from '@nextui-org/link';

import {cookies} from 'next/headers';

import {auth} from '@/auth';
import {title} from '@/components/primitives';
import {SignOut} from '@/components/signOutBtn';

export default async function BlogPage() {
    const session = await auth();
    const cookieStore = cookies();
    const barongSession = cookieStore.get('_barong_session')?.value;

    console.log(barongSession);

    const data = await fetch('https://gamma.coinfinacle.com/api/v2/barong/resource/users/me',
        {
            headers: {
                'Cookie': `_barong_session=${barongSession}`,
            },
        });
    const data1 = await data.json();

    console.log(data);

    return (
        <div>
            <pre>{JSON.stringify(session)}</pre>
            <pre>{JSON.stringify(data1)}</pre>
            <h1 className={title()}>Blog</h1>
            <br/>
            <Link href="/login">Sign In</Link>
            <SignOut/>
        </div>
    );
}
