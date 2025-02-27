import React from 'react';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import NextLink from 'next/link';

import { Logo } from '@/components/icons';
import { subtitle } from '@/components/primitives';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';

export const Footer: React.FC = async () => {
    return (
        <footer
            className="z-20 w-full border-t border-dashed border-foreground-200 bg-foreground-50 px-4 lg:px-0"
        >
            <section className="mx-auto w-full py-12 lg:max-w-[1080px]">
                <div className="grid grid-cols-4 gap-6 md:gap-0">
                    <div className="relative col-span-4 px-4 md:col-span-1">
                        <span className="absolute left-0 h-6 w-px bg-orange-500"/>
                        <h3 className={subtitle({ className: 'relative mb-2' })}>
                            <span>{siteConfig.name}</span>
                        </h3>
                        <div className="mb-0.5 flex max-w-36 flex-col gap-1 text-sm">
                            <p>{siteConfig.description}</p>
                        </div>
                    </div>
                    {Object.entries(siteConfig.footerNavItems).map(([key, items]) => (
                        <div key={key + 'footer'} className="relative col-span-2 px-4 md:col-span-1">
                            <span className="absolute left-0 h-6 w-px bg-orange-500"/>
                            <h3 className={subtitle({ className: 'relative mb-2 capitalize' })}>
                                {key}
                            </h3>
                            <ul className="[&_li]:mb-2">
                                {items.map((item, index) => (
                                    <li key={item.path + index}>
                                        <Link
                                            as={NextLink}
                                            color="foreground"
                                            href={item.path}
                                            isExternal={true}
                                            size="sm"
                                            underline="hover"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Divider className="my-4"/>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <NextLink className="flex items-center justify-start gap-1" href="/">
                        <Logo/>
                        <p className="font-bold text-inherit">{siteConfig.name}</p>
                    </NextLink>
                    <p className="text-xs">© 2025 {siteConfig.name}. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <ThemeSwitch/>
                    </div>
                </div>
            </section>
        </footer>
    );
};
