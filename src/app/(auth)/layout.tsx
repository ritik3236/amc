import React from 'react';

import { ThemeSwitch } from '@/components/theme-switch';
import { BackgroundGradient } from '@/components/ui/BackgroundGradient';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col items-center gap-4 py-8 md:py-10">
            <header className="z-10 flex justify-end">
                <ThemeSwitch/>
            </header>
            <div className="inline-block max-w-lg justify-center text-center">
                {children}
            </div>
            <BackgroundGradient/>
        </section>
    );
}
