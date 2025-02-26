'use client';

import React from 'react';

import { Button } from '@heroui/button';
import { Card, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import { Link } from '@heroui/link';

import { useInterval } from 'ahooks';
import NextLink from 'next/link';

import { Icons, Svgs } from '@/components/icons';
import { description, subtitle } from '@/components/primitives';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { pageConstants } from 'src/lib/constant';

export const Services: React.FC = () => {
    const [selected, setSelected] = React.useState('global');
    const activeService = pageConstants.landing.services[selected];

    useInterval(() => {
        const keys = Object.keys(pageConstants.landing.services);

        setSelected(keys[(keys.indexOf(selected) + 1) % keys.length]);
    }, 5000);

    return (
        <div className="col-span-4 flex w-full flex-col">
            <div
                className="col-span-4 grid grid-cols-2 flex-wrap justify-center border-b border-dashed dark:border-default lg:flex">
                {Object.values(pageConstants.landing.services).map((service) => (
                    <div key={service.key} className="flex flex-col space-y-1">
                        <button
                            className={cn('flex items-center space-x-2 whitespace-nowrap rounded-lg px-4 py-3 text-xs font-semibold transition hover:bg-gray-500/5', { 'text-primary-500': selected === service.key })}
                            onClick={() => setSelected(service.key)}
                        >
                            <service.tabIcon/>
                            <span>{service.tabTitle}</span>
                        </button>
                        <div
                            className={cn('h-0.5 w-full transition-all', { 'bg-primary-500': selected === service.key })}/>
                    </div>
                ))}
            </div>
            <div className="relative overflow-hidden bg-gray-200">
                <div className="absolute inset-x-0 bottom-0"><Svgs.bgWave/></div>
                <div
                    className="relative col-span-4 grid grid-cols-1 flex-col overflow-hidden bg-white/10 lg:grid-cols-2">
                    <div className="m-4 flex flex-col bg-white/80 p-4 pr-8 backdrop-blur-2xl dark:bg-black/80">
                        <div
                            className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-gray-900 text-white">
                            <activeService.contentIcon/>
                        </div>
                        <h2 className={subtitle({ size: 'lg' })}>
                            {activeService.contentTitle}
                        </h2>
                        <p className={description({ size: 'xs' })}>
                            {activeService.contentDesc}
                        </p>
                        <Link
                            as={NextLink}
                            className="mt-4 flex items-center space-x-1 hover:opacity-70"
                            href="/contact-us"
                        >
                            <span>Let&apos;s chat</span>
                            <Icons.arrowRight/>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="rounded-2xl border border-white/20 bg-white/30 p-3">
                            <Card isFooterBlurred className="w-[200px]" radius="lg">
                                <Image
                                    alt="Woman listing to music"
                                    className="object-cover"
                                    height={200}
                                    src="https://img.freepik.com/free-photo/virtual-assistant-circle-background-purple-gradient-disruptive-technology_53876-124676.jpg?t=st=1736987261~exp=1736990861~hmac=d2a425aa2ca52572ba84ea7f8b6c4edbb35edf87a805108b93d38537118aac44&w=2000"
                                    width={200}
                                />
                                <CardFooter
                                    className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
                                    <p className="text-tiny text-white/80">interested?</p>
                                    <Button
                                        as={Link}
                                        className="bg-black/20 text-tiny text-white"
                                        color="default"
                                        href={siteConfig.links.book_a_demo} radius="lg" size="sm" variant="flat"
                                    >
                                        Book a demo
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
