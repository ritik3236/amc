import React from 'react';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import {
    Navbar as NextUINavbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@heroui/navbar';

import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from 'src/components/icons';
import { siteConfig } from 'src/config/site';

export const Navbar: React.FC = async () => {
    return (
        <NextUINavbar isBordered maxWidth="xl">
            <NavbarContent className="pr-3 md:hidden" justify="center">
                <NavbarBrand>
                    <Logo/>
                    <p className="font-bold text-inherit">{siteConfig.name}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 md:flex" justify="start">
                <NavbarBrand as={NextLink} href="/" scroll={true}>
                    <Logo/>
                    <p className="font-bold text-inherit">{siteConfig.name}</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex" justify="center">
                {siteConfig.navItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <Link
                            as={NextLink}
                            color="foreground"
                            href={item.href}
                            isExternal={item.isExternal}
                            underline="hover"
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="hidden md:flex" justify="end">
                <NavbarItem>
                    <Link as={NextLink} color="foreground" href="/login" underline="hover">My Account</Link>
                </NavbarItem>
                <ThemeSwitch/>
            </NavbarContent>

            <NavbarContent className="md:hidden" justify="end">
                <ThemeSwitch/>
                <NavbarMenuToggle/>
            </NavbarContent>

            <NavbarMenu>
                {siteConfig.navItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            as={NextLink}
                            className="w-full"
                            color="foreground"
                            href={item.href}
                            isExternal={item.isExternal}
                            size="sm"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <Divider/>
                <NavbarMenuItem>
                    <Link
                        as={NextLink}
                        className="w-full"
                        color="foreground"
                        href="/login"
                        size="md"
                    >
                        Dashboard
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </NextUINavbar>
    );
};
