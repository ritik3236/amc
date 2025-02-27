import React from 'react';

import { Metadata } from 'next';
import NextLink from 'next/link';

import { Logo } from '@/components/icons';
import { linkStyles } from '@/components/primitives';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: 'Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="grid h-screen grid-cols-6 overflow-hidden md:grid-cols-12">
            <section className="z-10 order-2 col-span-12 flex h-full flex-col">
                <header className="flex items-center justify-between  p-8 ">
                    <NextLink className="-ml-1 flex items-center gap-1" href="/">
                        <Logo size={32}/>
                        <span className="font-bold">{siteConfig.name}</span>
                    </NextLink>
                    <ThemeSwitch/>
                </header>
                <div className="flex flex-1">{children}</div>
                <footer>
                    <div className="flex flex-wrap items-center gap-4 p-8 text-sm text-default-500">
                        <p>{siteConfig.name} &copy; 2025</p>
                        <NextLink
                            className={linkStyles().base({ size: 'xs', color: 'default' })}
                            href="/contact-us"
                        >
                            Contact us
                        </NextLink>
                        <NextLink
                            className={linkStyles().base({ size: 'xs', color: 'default', className: 'mr-auto' })}
                            href="/terms"
                        >
                            Terms & Conditions
                        </NextLink>
                        <a href={'mailto:' + siteConfig.email}>
                            {siteConfig.email}
                        </a>
                    </div>
                </footer>
            </section>
        </section>
    );
}
