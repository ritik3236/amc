import React from 'react';

import Image from 'next/image';

import { Services } from '@/components/landingPage/services';
import { LogoCarousel } from '@/components/logo-carousel';
import { Arrow } from 'src/components/icons';
import { subtitle, title } from 'src/components/primitives';

export default function Home() {
    return (
        <React.Fragment>
            <section
                className="relative z-20 col-span-4 mb-32 flex flex-1 translate-y-0 flex-col items-center opacity-100 transition-all duration-1000"
            >
                <div
                    className="mx-auto mb-16 grid w-full flex-1 grid-cols-1 px-4 pt-10 lg:w-[1080px] lg:grid-cols-4 lg:px-0">
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
                            <Arrow className="ml-2 transition-all group-hover:pl-2" size={20}/>
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
                className="relative z-20 mx-auto grid w-full translate-y-0 opacity-100 transition-all duration-1000 lg:w-[1080px] lg:grid-cols-4 ">
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
        </React.Fragment>
    );
}
