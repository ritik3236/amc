import 'src/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { BgCircle } from '@/components/bgCircle';
import Footer from '@/components/Footer';
import { figTree } from '@/config/fonts';
import { Navbar } from 'src/components/navbar';
import { siteConfig } from 'src/config/site';

import { Providers } from './providers';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx(
                    'min-h-screen bg-background antialiased',
                    figTree.className
                )}
            >
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark', children: '' }}>
                    <div className="relative flex flex-col">
                        <div className="relative z-10 mx-auto flex h-screen w-full flex-1 flex-col bg-background">
                            <Navbar/>
                            <main className="relative z-10 w-full grow bg-background/70 pt-16 backdrop-blur-[100px]">
                                <div
                                    className="fixed inset-y-0 left-1/2 right-0 z-20 hidden -translate-x-1/2 grid-cols-4 border-x border-dashed border-primary/5 dark:border-slate-900 lg:grid lg:w-[1080px]">
                                    <div />
                                    <div className="border-x border-dashed border-black/5 dark:border-slate-900" />
                                    <div className="border-r border-dashed border-black/5 dark:border-slate-900" />
                                </div>
                                {children}
                                <SpeedInsights/>
                                <Footer/>
                            </main>
                            <BgCircle/>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
