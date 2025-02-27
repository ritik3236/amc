import { Suspense } from 'react';

import { LoginForm } from '@/app/(auth)/utils/LoginForm';
import { description, title } from '@/components/primitives';

export default function Page() {
    return (
        <section className="m-auto w-full sm:w-[420px]">
            <div className="p-6 text-center">
                <h2 className={title({ size: 'xs' })}>
                    Login 🧑‍💻
                </h2>
                <p className={description()}>
                    to manage your transactions and experience the future of digital payments today!
                </p>
            </div>
            <div className="p-6">
                <Suspense>
                    <LoginForm/>
                </Suspense>
            </div>
            {/*<div className="pb-6">*/}
            {/*    <p className="flex justify-center gap-1 text-center text-sm">*/}
            {/*        <span>Don&apos;t have an account?</span>*/}
            {/*        <NextLink className={linkStyles().base({ type: 'underline' })} href="/signup">Sign up</NextLink>*/}
            {/*    </p>*/}
            {/*</div>*/}
        </section>
    );
}
