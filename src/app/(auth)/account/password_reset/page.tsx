'use client';

import React from 'react';
import NextLink from 'next/link';

import { ResetPasswordForm } from '@/app/(auth)/utils';
import { Logo } from '@/components/icons';
import { description, link, subtitle } from '@/components/primitives';
import { siteConfig } from '@/config/site';
import { passwordRegexMessage } from '@/lib/zod';

export default function Page() {
    return (
        <section className="m-4 w-full rounded-lg border border-default shadow-lg sm:w-[420px]">
            <div className="border-b border-dashed border-default p-6">
                <NextLink className="-ml-1 mb-4 flex items-center gap-1" href="/">
                    <Logo size={32}/>
                    <span className="font-bold">{siteConfig.name}</span>
                </NextLink>
                <h2 className={subtitle()}>
                    Reset your password
                </h2>
                <p className={description({ size: 'xs', className: 'mb-0' })}>
                    {passwordRegexMessage}
                </p>
            </div>
            <div className="p-6 pb-2">
                <ResetPasswordForm/>
            </div>
            <div className="pb-6">
                <p className="flex justify-center gap-1 text-center text-sm">
                    <span>Trouble login?</span>
                    <NextLink className={link().base()} href="/contact-us">Contact us</NextLink> /
                    <NextLink className={link().base()} href="/login">Login</NextLink>
                </p>
            </div>
        </section>
    );
};
