import { Suspense } from 'react';
import NextLink from 'next/link';

import { SignUpForm } from '@/app/(auth)/utils';
import { description, linkStyles, title } from '@/components/primitives';

export default function Page() {
    return (
        <section className="m-auto w-full sm:w-[420px]">
            <div className="p-6 text-center">
                <h2 className={title({ size: 'xs' })}>
                    Create your account
                </h2>
                <p className={description()}>
                    Sign up to start managing your crypto payments easily and securely. Let’s get you started!
                </p>
            </div>
            <div className="p-6">
                <Suspense>
                    <SignUpForm/>
                </Suspense>
            </div>
            <div className="pb-6">
                <p className="flex justify-center gap-1 text-center text-sm">
                    <span>Already have an account?</span>
                    <NextLink className={linkStyles().base({ type: 'underline' })} href="/login">Sign in</NextLink>
                </p>
            </div>
        </section>
    );
}
