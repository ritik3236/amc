import 'src/styles/globals.css';
import { Link } from '@nextui-org/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';

import { BgCircle } from '@/components/bgCircle';
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
                            <main
                                className="relative z-10 w-full grow bg-background/70 pt-16 backdrop-blur-[100px]"
                            >
                                <div
                                    className="fixed inset-y-0 left-1/2 right-0 z-20 hidden -translate-x-1/2 grid-cols-4 border-x border-dashed border-primary/5 dark:border-slate-800 lg:grid lg:w-[1080px]">
                                    <div />
                                    <div className="border-x border-dashed border-black/5 dark:border-slate-800" />
                                    <div className="border-r border-dashed border-black/5 dark:border-slate-800" />
                                </div>
                                {children}
                                <SpeedInsights/>
                            </main>
                            <BgCircle/>
                            <footer className="z-10 flex w-full items-center justify-center py-3 backdrop-blur-[100px]">
                                <Link
                                    isExternal
                                    className="flex items-center gap-1 text-current"
                                    href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                                    title="nextui.org homepage"
                                >
                                    <span className="text-default-600">Powered by</span>
                                    <p className="text-primary">Me</p>
                                </Link>
                            </footer>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
