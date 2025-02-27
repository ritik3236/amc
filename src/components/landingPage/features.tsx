import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHelp, IconInfinity,
    IconRouteAltLeft,
    IconTerminal2,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';

const features = [
    {
        title: 'Built for developers',
        description:
            'Built for engineers, developers, dreamers, thinkers and doers.',
        icon: <IconTerminal2/>,
    },
    {
        title: 'Instant Activation',
        description:
            'Get activated within minutes. Completely online onboarding with minimum documentation.',
        icon: <IconEaseInOut/>,
    },
    {
        title: 'Pricing like no other',
        description:
            'Our innovative payment solutions with competitive pricing make payments simpler.',
        icon: <IconCurrencyDollar/>,
    },
    {
        title: '100% Uptime',
        description: 'We just cannot be taken down by anyone. We are 100% uptime guaranteed.',
        icon: <IconCloud/>,
    },
    {
        title: 'Instant settlement',
        description: 'Instant settlement. Get paid instantly and settle your funds in your preferred currency',
        icon: <IconRouteAltLeft/>,
    },
    {
        title: '24/7 Support',
        description:
            'We are available a 100% of the time, customers are our first priority.',
        icon: <IconHelp/>,
    },
    {
        title: 'Initiative dashboard',
        description:
            'Track your transactions, view account, make withdrawals, deposits, and more with dashboard.',
        icon: <IconAdjustmentsBolt/>,
    },
    {
        title: 'No Limits',
        description: 'Any amount may be transferred in accordance with your requirements.',
        icon: <IconInfinity/>,
    },
];

export function FeaturesSectionDemo() {
    return (
        <div className="relative z-10 mx-auto grid grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index}/>
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                'flex flex-col border-dashed  py-10 relative group/feature dark:border-neutral-800',
                (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
                index < 4 && 'lg:border-b dark:border-neutral-800'
            )}
        >
            {index < 4 && (
                <div
                    className="pointer-events-none absolute inset-0 size-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800"/>
            )}
            {index >= 4 && (
                <div
                    className="pointer-events-none absolute inset-0 size-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800"/>
            )}
            <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
                {icon}
            </div>
            <div className="relative z-10 mb-2 px-10 text-lg font-bold">
                <div
                    className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-r-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700"/>
                <span
                    className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
                    {title}
                </span>
            </div>
            <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
                {description}
            </p>
        </div>
    );
};
