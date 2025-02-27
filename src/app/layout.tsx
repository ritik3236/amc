import 'src/styles/globals.css';

import React from 'react';
import { Metadata, Viewport } from 'next';

import { figTree } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { Providers } from '@/lib/providers';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/images/favicon.ico',
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
            <body className={cn('min-h-screen bg-background antialiased ', figTree.className)}>
                <Providers themeProps={{
                    attribute: 'class',
                    children: '',
                    defaultTheme: 'light',
                    enableSystem: false,
                }}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
