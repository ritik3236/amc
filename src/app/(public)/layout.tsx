import React from 'react';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/navbar';

export default function PublicRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col">
            <div className="relative z-10 mx-auto flex h-screen w-full flex-1 flex-col bg-background">
                <Navbar/>
                <main className="relative z-10 w-full grow bg-background/70 backdrop-blur-[100px] dark:bg-grid-white/[0.1]"
                    role="main">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"/>
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    );
}
