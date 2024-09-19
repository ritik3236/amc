import React from 'react';

import { ThemeSwitch } from '@/components/theme-switch';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex h-screen overflow-hidden">
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <div className="z-10 flex justify-end p-4">
                    <ThemeSwitch/>
                </div>
                <main className="z-10 flex size-full p-4">
                    {children}
                </main>
                <BackgroundGradient/>
            </div>
        </section>
    );
}
