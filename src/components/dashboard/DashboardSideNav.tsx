import React from 'react';

import NextLink from 'next/link';

import { Logo } from '@/components/icons';
import { siteConfig } from '@/config/site';

export const DashboardSideNav: React.FC = async () => {
    const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col overflow-y-hidden border-r border-divider">
            <div className="flex h-16 items-center justify-center border-b border-dashed border-divider">
                <NextLink className="flex items-center gap-1" href="/">
                    <Logo size={32}/>
                    <p className="font-bold">CoinDhan Admin</p>
                </NextLink>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <ul className="flex w-full flex-col gap-2 p-2 text-sm">
                    {siteConfig.dashboardSideNavItems.map((item) => (
                        <li
                            key={item.href}
                            className="flex items-center justify-center gap-2 rounded-small p-2 transition-background hover:bg-default-100/50 hover:backdrop-blur-sm "
                        >
                            {item.icon && <item.icon className={iconClasses}/>}
                            <NextLink className="w-full" href={item.href}>
                                <span>{item.label}</span>
                            </NextLink>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};
