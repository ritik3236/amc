import React from 'react';

import Image from 'next/image';

import { DashboardSideNav, DashboardTopNav } from '@/components/dashboard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex h-screen overflow-hidden">
            <DashboardSideNav/>
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <DashboardTopNav/>
                <main className="z-10 size-full p-4">
                    {children}
                </main>

                <div aria-hidden="true"
                    className="fixed bottom-0  left-0 z-0 hidden dark:opacity-70 dark:md:block">
                    <Image
                        alt="docs left background"
                        className="relative z-10 rounded-large opacity-0 shadow-none shadow-black/5 !duration-300 transition-transform-opacity data-[loaded=true]:opacity-100 motion-reduce:transition-none"
                        data-loaded="true"
                        height={400}
                        src="/images/docs-left.png"
                        width={400}
                    />
                </div>
                <div aria-hidden="true"
                    className="fixed right-[-60%] top-[-80%] z-0 hidden rotate-12 dark:opacity-70 dark:md:block 2xl:right-[-45%] 2xl:top-[-60%]">
                    <img
                        alt="docs right background"
                        className="relative z-10 rounded-large opacity-0 shadow-none shadow-black/5 !duration-300 transition-transform-opacity data-[loaded=true]:opacity-100 motion-reduce:transition-none"
                        data-loaded="true" src="/images/docs-right.png"
                    />
                </div>
            </div>
        </section>
    );
}
