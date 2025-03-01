'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Link from 'next/link';

import { cn } from '@/lib/utils';

export const CardHoverEffect = ({ items, className }: {
    items: {
        title: string;
        description: string;
        link: string;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10',
                className
            )}
        >
            {items.map((item, idx) => (
                <Link
                    key={item?.title}
                    className="group relative  block size-full p-2"
                    href={item.link}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                className="absolute inset-0 block size-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                                initial={{ opacity: 0 }}
                                layoutId="hoverBackground"
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn('text-zinc-100 font-bold tracking-wide mt-4', className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
                className
            )}
        >
            {children}
        </p>
    );
};

export const projects = [
    {
        title: 'Developer-friendly APIs',
        description: 'We have built APIs that are easy to use and integrate with your platform.',
        link: '#',
    },
    {
        title: 'Flexible integration options',
        description:
            'Integrate our API & widget with your platform in minutes. Our API/Widget is easy to use and integrate with your platform.',
        link: '#',
    },
    {
        title: 'Sample codes for testing',
        description:
            'We provide sample codes for testing our API. You can use these codes to test our API and ensure that it works as expected.',
        link: '#',
    },
    {
        title: 'Plugins for major platforms',
        description:
            'We have plugins for major platforms such as WordPress, Shopify, WooCommerce, and Magento.',
        link: '#',
    },
    {
        title: 'Webhooks for real-time updates',
        description:
            'We provide webhooks for real-time updates. You can use these webhooks to get updates on your transactions.',
        link: '#',
    },
    {
        title: 'Secure APIs',
        description:
            'All our APIs are secure. We use the latest encryption technology to ensure that your funds are protected at all times.',
        link: '#',
    },
];
