import React from 'react';

import { Link } from '@nextui-org/link';
import Image from 'next/image';

import { Services } from '@/components/landingPage/services';
import { LogoCarousel } from '@/components/logo-carousel';
import { Icons } from 'src/components/icons';
import { subtitle, title } from 'src/components/primitives';

export default function Home() {
    return (
        <React.Fragment>
            <section
                className="relative z-20 col-span-4 mb-32 flex flex-1 translate-y-0 flex-col items-center opacity-100 transition-all duration-1000"
            >
                <div
                    className="mx-auto mb-32 grid w-full flex-1 grid-cols-1 px-4 pt-10 lg:w-[1080px] lg:grid-cols-4 lg:px-0">
                    <div/>
                    <div className="col-span-2">
                        <h1 className="mb-5 text-center">
                            <span className={title()}>Accept&nbsp;</span>
                            <span className={title({ color: 'violet' })}>Payments</span>
                            <br/>
                            <span className={title({ color: 'yellow' })}>
                                in crypto within seconds
                            </span>
                        </h1>
                        <span className=" mb-8 flex w-full text-center text-sm  text-gray-600 lg:text-base">
                            Enhance revenue by improving conversion rates with global payment acceptance, featuring instant settlement and payouts, all customized to meet the unique needs of each business.
                        </span>
                        <a className="group z-30 mx-auto flex w-full max-w-[350px] items-center rounded-full bg-blue-500 p-5 px-6 text-base font-medium text-white shadow-2xl shadow-blue-500/30 transition-all"
                            href="/contact">
                            <Image
                                alt="dan"
                                className="z-20 size-8 rounded-full ring-2 ring-blue-500"
                                height="20"
                                src="https://ca.slack-edge.com/T04LPRJQANN-U04M2F2075X-9cd18da8cbe6-512"
                                width="20"
                            />
                            <Image
                                alt="rob"
                                className="z-10 -ml-4 size-8 rounded-full ring-2 ring-blue-500"
                                height="20"
                                src="https://ca.slack-edge.com/T04LPRJQANN-U062N0WKY92-0d1531593d62-512"
                                width="20"
                            />
                            <Image
                                alt="jake"
                                className="-ml-4 size-8 rounded-full ring-2 ring-blue-500"
                                height="20"
                                src="https://ca.slack-edge.com/T04LPRJQANN-U060KPE8ZC2-c8ce89af4cf0-512"
                                width="20"
                            />
                            <span
                                className="ml-3">Book a call with our team</span>
                            <Icons.arrowRight className="ml-2 transition-all group-hover:ml-4"/>
                        </a>
                        <div className="mx-auto flex flex-col items-center space-y-4 py-16">
                            <p className=" w-full text-center text-sm lg:w-[500px]">
                                &quot;Coinflow eliminated the hassle and complexity of payments. They&apos;re more
                                than a payment service; they’re an essential partner for our product&quot;
                            </p>
                            <div className="flex items-center space-x-3">
                                <img alt="gameshift" className="size-6 rounded-2xl object-contain"
                                    src="https://pbs.twimg.com/profile_images/1743115956568678400/9XjgNzuT_400x400.jpg"/>
                                <p className="text-xs text-gray-600">
                                    Davis, Product Lead at Solana Gameshift
                                </p>
                            </div>
                        </div>
                    </div>
                    <div/>
                </div>
                <LogoCarousel/>
            </section>
            <section
                className="relative z-20 mx-auto grid w-full translate-y-0 py-32 opacity-100 transition-all duration-1000 lg:w-[1080px] lg:grid-cols-4 ">
                <div className="col-span-2 col-start-2 mb-16 flex flex-col gap-6 text-center">
                    <h2 className={title({ size: 'sm' })}>
                        Elevate your earnings with modern payments technology
                    </h2>
                    <p className={subtitle()}>
                        Reduce costs, grow revenue, and run your business more efficiently on a fully integrated
                        platform. Use Coinflow to handle all of your payments-related needs, manage revenue operations,
                        and launch (or invent) new business models
                    </p>
                </div>
                <Services/>
            </section>
            <section className="w-full py-32">
                <div
                    className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 opacity-100 transition-all duration-1000 lg:w-[1080px] ">
                    <div className="relative col-span-4 grid grid-cols-1 lg:grid-cols-2">
                        <div className="flex flex-col pr-8">
                            <div className="absolute h-10 w-px bg-blue-500"/>
                            <div className="ml-4">
                                <h2 className={title({ size: 'xsm' })}>
                                    Secure, PCI-compliant payments with multi-bank redundancy
                                </h2>
                                <p className={subtitle({})}>Trust Coinflow for secure, PCI-compliant
                                    payments. Our multi-bank redundancy ensures your transactions are always reliable
                                    and
                                    protected—because your business deserves no less.
                                </p>
                                <Link
                                    className="group flex items-center pt-4 text-base text-blue-500 transition hover:opacity-70"
                                    href="/about">
                                    <span>Contact sales</span>
                                    <Icons.arrowRight className="ml-2 transition-all group-hover:ml-2"/>
                                </Link>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-auto lg:grid-cols-2 lg:gap-0">
                            <div className="flex flex-col space-y-4">
                                <svg className="ml-4" fill="none" height="32" viewBox="0 0 24 24"
                                    width="32" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.53 17.31v-.16c0-1.93-.98-2.9-2.9-2.9s-2.9.98-2.9 2.9v.16c-1.05.26-1.47.98-1.47 2.42v.74c0 1.85.69 2.53 2.53 2.53h3.68c1.85 0 2.53-.69 2.53-2.53v-.74c0-1.43-.42-2.16-1.47-2.42Zm-2.91-1.68c1.29 0 1.52.49 1.52 1.52v.05H17.1v-.05c0-1.03.23-1.52 1.52-1.52ZM6.747 2.065c.55-.07 1.003.386 1.003.94V6.8a1 1 0 0 1-1 1H3c-.552 0-1.008-.45-.941-.998.327-2.687 2.013-4.39 4.688-4.737ZM20.93 7.8h-3.68a1 1 0 0 1-1-1V3.006c0-.554.454-1.011 1.004-.94 2.634.344 4.31 2.002 4.676 4.614.08.59-.4 1.12-1 1.12ZM6.75 16.3a1 1 0 0 1 1 1v3.62c0 .6-.53 1.08-1.13 1-2.57-.382-4.19-2.028-4.546-4.61-.076-.551.381-1.01.939-1.01H6.75ZM7.75 10.3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h3.75a1 1 0 0 0 1-1v-3.5ZM14.75 10.3a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h3.5c.55 0 1-.45 1-1v-3.5ZM14.75 3a1 1 0 0 0-1-1h-3.5a1 1 0 0 0-1 1v3.8a1 1 0 0 0 1 1h3.5a1 1 0 0 0 1-1V3Z"
                                        fill="#3b82f6"/>
                                </svg>
                                <h1 className="border-l border-blue-600 pl-4 text-xl font-semibold !leading-normal text-gray-900 lg:text-base">Do
                                    way more, with less</h1><p className="px-4 text-sm text-gray-600">We built
                                        payment-adjacent features so you don’t have to dedicate extra resources to onboarding,
                                        chargeback responses or PCI-compliance.</p></div>
                            <div className="flex flex-col space-y-4">
                                <svg className="ml-4" fill="none" height="32" viewBox="0 0 24 24"
                                    width="32" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="m19.37 4.891-5.86-2.61c-.86-.38-2.16-.38-3.02 0l-5.86 2.61c-1.48.66-1.7 1.56-1.7 2.04s.22 1.38 1.7 2.04l5.86 2.61c.43.19.97.29 1.51.29s1.08-.1 1.51-.29l5.86-2.61c1.48-.66 1.7-1.56 1.7-2.04s-.21-1.38-1.7-2.04Z"
                                        fill="#3b82f6"/>
                                    <path
                                        d="M12 17.04c-.38 0-.76-.08-1.11-.23l-6.74-3c-1.03-.46-1.83-1.69-1.83-2.82 0-.41.33-.74.74-.74s.74.33.74.74c0 .54.45 1.24.95 1.46l6.74 3c.32.14.69.14 1.01 0l6.74-3c.5-.22.95-.91.95-1.46 0-.41.33-.74.74-.74s.74.33.74.74c0 1.12-.8 2.36-1.83 2.82l-6.74 3c-.34.15-.72.23-1.1.23Z"
                                        fill="#3b82f6"/>
                                    <path
                                        d="M12 22c-.38 0-.76-.08-1.11-.23l-6.74-3a3.085 3.085 0 0 1-1.83-2.82c0-.41.33-.74.74-.74s.74.33.74.74c0 .63.37 1.2.95 1.46l6.74 3c.32.14.69.14 1.01 0l6.74-3c.57-.25.95-.83.95-1.46 0-.41.33-.74.74-.74s.74.33.74.74c0 1.22-.72 2.32-1.83 2.82l-6.74 3c-.34.15-.72.23-1.1.23Z"
                                        fill="#3b82f6"/>
                                </svg>
                                <h1 className="border-l border-blue-600 pl-4 text-xl font-semibold !leading-normal text-gray-900 lg:text-base"> Extreme
                                    reliability</h1><p className="px-4 text-sm text-gray-600">Coinflow partners with
                                        multiple banks and financial institutions under the hood, so you can always transact
                                        with confidence.</p></div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
