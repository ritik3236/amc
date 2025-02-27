import React from 'react';

import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { CheckIcon } from '@heroui/shared-icons';
import Image from 'next/image';
import NextLink from 'next/link';

import { Icons } from '@/components/icons';
import { CardHoverEffect, projects } from '@/components/landingPage/card-hover-effect';
import { Cover } from '@/components/landingPage/cover';
import { FaqComponent } from '@/components/landingPage/faq';
import { FeaturesSectionDemo } from '@/components/landingPage/features';
import { WorldMap } from '@/components/landingPage/world-map';
import { description, link, title } from '@/components/primitives';
import { siteConfig } from '@/config/site';

export default function Home() {
    return (
        <React.Fragment>
            <section
                className="relative z-20  col-span-4 mb-8 flex flex-1 flex-col items-center overflow-hidden pt-8 transition-all duration-1000 md:mb-28 md:pt-16"
            >
                <div
                    className="m-auto flex w-full flex-1  flex-col items-center justify-center px-4 pt-12 text-center lg:w-[1080px] lg:grid-cols-4 lg:px-0">
                    <h1 className={title({ className: 'mb-8' })}>
                        Experiences the Safest and Fastest
                        <br/> Payments <Cover>With {siteConfig.name}</Cover>
                    </h1>
                    <p className={description({ size: 'md', className: 'sm:w-1/2 mx-auto mb-8' })}>
                        Start accepting online payments within minutes with minimum documentation and 100% digital
                        KYC at zero cost via <br/>{siteConfig.name} Payment Gateway
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            as={NextLink}
                            color="primary"
                            href="/contact-us"
                            size="md"
                            variant="bordered"
                        >
                            <span>Get Started</span>
                            <Icons.arrowRight className={link().icon()}/>
                        </Button>
                        <Button
                            as={Link}
                            color="primary"
                            href={siteConfig.links.book_a_demo}
                            isExternal={true}
                            size="md"
                            variant="solid"
                        >
                            <Icons.calendar/>
                            <span>Book a Demo</span>
                        </Button>
                    </div>
                </div>
            </section>
            <section
                className="relative z-20 mx-auto grid w-full translate-y-0 py-8 opacity-100 transition-all duration-1000 md:py-28 lg:w-[1080px] lg:grid-cols-4"
                id="features"
            >
                <div className="col-span-4 flex flex-col items-center justify-center gap-4">
                    <div
                        className="grid grid-cols-1 rounded-lg border  border-default/40 shadow contain-content sm:grid-cols-2">
                        <div className="col-span-1 p-4 md:p-12">
                            <div className={title({ size: 'sm' })}>
                                Supercharge your business with the power of {siteConfig.name}
                            </div>
                            <ul className="my-4 space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>Multiple Payment Methods</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>Superior Checkout Experience</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>Industry Leading Success Rate</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>Easy to Integrate</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>Secure and Reliable</p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon className="text-success"/> <p>In-depth Reporting and Insights</p>
                                </li>
                            </ul>
                            <Button
                                as={NextLink}
                                color="primary"
                                href="/contact-us"
                                size="md"
                                variant="solid"
                            >
                                <span>Get Started</span>
                                <Icons.arrowRight className={link().icon()}/>
                            </Button>
                        </div>
                        <div className="col-span-1 h-full">
                            <Image alt="hero" className="size-full" height={500} src={'/images/hero.webp'} width={500}/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-28">
                <div className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 lg:w-[1080px] ">
                    <div className="col-span-4 flex flex-col items-center justify-center gap-4">
                        <div className={title({ size: 'sm', color: 'foreground' })}>
                            Our Features!
                        </div>
                    </div>
                    <div className="col-span-4">
                        <FeaturesSectionDemo/>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-28">
                <div className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 lg:w-[1080px] ">
                    <div
                        className="col-span-4  flex flex-col items-center justify-center gap-4 px-4 text-center md:px-0">
                        <div className={title({ size: 'sm', color: 'foreground' })}>
                            Built for Developers by Developers
                        </div>
                    </div>
                    <div className="col-span-4 mx-auto">
                        <CardHoverEffect items={projects}/>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-28">
                <div
                    className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 px-4 md:px-0 lg:w-[1080px] ">
                    <div className="col-span-4 mb-12 flex flex-col items-center  justify-center gap-4">
                        <div className={title({ size: 'sm', color: 'foreground' })}>
                            Bill Payment from Anywhere
                        </div>
                        <p className={description({ className: 'text-center' })}>
                            Break free from traditional boundaries. bill payment from any corner of the country.
                        </p>
                    </div>
                    <div className="col-span-4">
                        <WorldMap
                            dots={[
                                {
                                    start: { lat: 8.2008, lng: -70.4937 }, // Alaska (Fairbanks)
                                    end: { lat: 34.0522, lng: -18.2437 }, // Los Angeles
                                },
                                {
                                    start: { lat: 8.2008, lng: -70.4937 }, // Alaska (Fairbanks)
                                    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                                },
                                {
                                    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                                    end: { lat: 20.6139, lng: -10.209 }, // New Delhi
                                },
                                {
                                    start: { lat: 20.6139, lng: -10.209 }, // New Delhi
                                    end: { lat: 34.0522, lng: -18.2437 }, // Los Angeles
                                },
                                {
                                    start: { lat: -51.5074, lng: -40.1278 }, // London
                                    end: { lat: 20.6139, lng: -10.209 }, // New Delhi
                                },
                                {
                                    start: { lat: 20.6139, lng: -10.209 }, // New Delhi
                                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                                },
                                {
                                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                                },
                            ]}
                        />
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-28">
                <div
                    className="relative z-20  mx-auto grid w-full translate-y-0 grid-cols-4 px-4 md:px-0 lg:w-[1080px] ">
                    <div className="col-span-4 mb-12 flex flex-col items-center justify-center gap-4 text-center">
                        <div className={title({ size: 'sm', color: 'foreground' })}>
                            Frequently Asked Questions
                        </div>
                    </div>
                    <div className="col-span-4">
                        <FaqComponent/>
                    </div>
                </div>
            </section>
            <section className="relative z-20 mx-auto grid w-full py-8 md:py-28 lg:w-[1080px] lg:grid-cols-4">
                <div
                    className="relative col-span-4 space-y-12 overflow-hidden rounded-none bg-neutral-950 p-12 text-center text-neutral-50 bg-grid-small-white/[0.2] lg:rounded-xl">
                    <h2 className={title({ size: 'sm' })}>
                        <span>Supercharge Your Business With</span>
                        <br/>
                        <span className={title({ size: 'sm', color: 'blue' })}>{siteConfig.name}</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            as={NextLink}
                            color="primary"
                            href="/contact-us"
                            size="md"
                            variant="bordered"
                        >
                            <span>Get Started</span>
                            <Icons.arrowRight className={link().icon()}/>
                        </Button>
                        <Button
                            as={Link}
                            color="primary"
                            href={siteConfig.links.book_a_demo}
                            isExternal={true}
                            size="md"
                            variant="shadow"
                        >
                            <Icons.calendar/>
                            <span>Book a Demo</span>
                        </Button>
                    </div>
                    <p className={description()}>
                        Sign up now to experience the future of payments and offer your customers the best checkout
                        experience.
                        <br/>
                        or book a demo to learn more about our solutions.
                    </p>
                </div>
            </section>
        </React.Fragment>
    );
}
