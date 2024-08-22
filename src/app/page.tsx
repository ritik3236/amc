import React from 'react';

import { Link } from '@nextui-org/link';
import Image from 'next/image';

import { Icons } from '@/components/icons';
import { Services } from '@/components/landingPage/services';
import { LogoCarousel } from '@/components/logo-carousel';
import { description, subtitle, title } from '@/components/primitives';
import { pageConstants } from '@/constant';

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
                                &quot;CoinDhan Pay eliminated the hassle and complexity of payments. They&apos;re more
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
                className="relative z-20 mx-auto grid w-full translate-y-0 py-8 opacity-100 transition-all duration-1000 md:py-32 lg:w-[1080px] lg:grid-cols-4 ">
                <div className="col-span-4 mb-16 flex flex-col gap-6 text-center lg:col-span-2 lg:col-start-2">
                    <h2 className={title({ size: 'sm' })}>
                        Elevate your earnings with modern payments technology
                    </h2>
                    <p className={description({ size: 'md' })}>
                        Reduce costs, grow revenue, and run your business more efficiently on a fully integrated
                        platform. Use Coinflow to handle all of your payments-related needs, manage revenue operations,
                        and launch (or invent) new business models
                    </p>
                </div>
                <Services/>
            </section>
            <section className="w-full py-8 md:py-32">
                <div className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 lg:w-[1080px] ">
                    <div className="relative col-span-4 grid grid-cols-1 lg:grid-cols-2">
                        <div>
                            <div className="sticky top-32 flex flex-col pr-8">
                                <div className="absolute h-10 w-px bg-blue-500"/>
                                <div className="ml-4">
                                    <h2 className={title({ size: 'xsm' })}>
                                        Crypto Payment Is Tailored for All Types of Business Model
                                    </h2>
                                    <p className={description({})}>
                                        Crypto payment is perfect for any business model and can be easily integrated
                                        into
                                        your existing operations or set up as a brand new service. We cover everyone
                                        from
                                        Forex and Crypto brokers to gaming!
                                    </p>
                                    <Link className="group flex items-center pt-4 hover:opacity-70" href="/about">
                                        <span>Contact sales</span>
                                        <Icons.arrowRight className="ml-1 transition-all group-hover:ml-2"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 grid grid-cols-1 lg:mt-auto lg:grid-cols-2">
                            {Object.values(pageConstants.landing.useCases).map((item) => (
                                <div key={item.key} className="mb-16 flex flex-col space-y-4">
                                    <h3 className={subtitle({ className: 'flex border-l border-blue-600 pl-4 !text-base' })}>
                                        <item.icon className="mr-4 text-blue-600" size={24}/>
                                        {item.title}
                                    </h3>
                                    <p className={description({ size: 'xsm', className: 'px-4' })}>
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-32">
                <div className="relative z-20 mx-auto grid w-full translate-y-0 grid-cols-4 lg:w-[1080px] ">
                    <div className="relative col-span-4 grid grid-cols-1 lg:grid-cols-2">
                        <div>
                            <div className="sticky top-32 flex flex-col pr-8">
                                <div className="absolute h-10 w-px bg-yellow-500"/>
                                <div className="ml-4">
                                    <h2 className={title({ size: 'xsm' })}>
                                        Crypto vs Cards/Fiat
                                    </h2>
                                    <p className={description({})}>
                                        Crypto payments have many advantages compared with traditional Fiat payment
                                        methods.
                                        eg. Crypto payments are cheaper, faster, and more secure than traditional
                                        payment
                                        methods. See the facts for yourself!
                                    </p>
                                    <Link className="group flex items-center pt-4 hover:opacity-70" href="/about">
                                        <span>Contact sales</span>
                                        <Icons.arrowRight className="ml-1 transition-all group-hover:ml-2"/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-12 whitespace-nowrap border-t border-dashed bg-gray-200/10 lg:mt-0">
                            <div className="absolute h-10 w-px bg-yellow-500"/>
                            <div className="flex border-b border-dashed p-3 font-semibold">
                                <span className="w-1/3">Features</span>
                                <span className="w-1/3 text-center">Crypto Payments</span>
                                <span className="w-1/3 text-center">Fiat Payments</span>
                            </div>
                            {pageConstants.landing.cryptoVsFiat.map((item) => (
                                <div key={item.feature}
                                    className="flex justify-between border-b border-dashed p-3 text-sm text-default-500"
                                >
                                    <span className="w-1/3 font-semibold">{item.feature}</span>
                                    <span className="flex w-1/3 items-center justify-center">
                                        {item.crypto === 'yes' ? <Icons.check className="text-green-500"/> : item.crypto === 'no'
                                            ? <Icons.cancel className="text-red-500"/> : item.crypto}
                                    </span>
                                    <span className="flex w-1/3 items-center justify-center">
                                        {item.fiat === 'yes' ? <Icons.check className="text-green-500"/> : item.fiat === 'no'
                                            ? <Icons.cancel className="text-red-500"/> : item.fiat}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
