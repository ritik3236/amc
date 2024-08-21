'use client';

import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Tab, Tabs } from '@nextui-org/tabs';

const TabContainerSvg = () => {
    return (
        <svg className="scale-x-[200%] transition delay-150 duration-300 ease-in-out" height="100%" id="svg"
            viewBox="0 0 1440 690" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="60%" x2="40%" y1="1%" y2="99%">
                    <stop offset="5%" stopColor="#2563eb"/>
                    <stop offset="95%" stopColor="#7c3aed"/>
                </linearGradient>
            </defs>
            <path className="transition-all delay-150 duration-300 ease-in-out"
                d="M 0,700 L 0,175 C 62.945139911634755,169.53810751104567 125.89027982326951,164.07621502209133 180,146 C 234.1097201767305,127.92378497790868 279.38402061855675,97.23324742268039 345,90 C 410.61597938144325,82.76675257731961 496.57363770250356,98.99079528718707 562,131 C 627.4263622974964,163.00920471281293 672.3214285714287,210.8035714285714 719,238 C 765.6785714285713,265.1964285714286 814.140648011782,271.79491899852724 877,237 C 939.859351988218,202.20508100147276 1017.1159793814431,126.01675257731961 1075,110 C 1132.8840206185569,93.98324742268039 1171.3954344624449,138.1380706921944 1229,159 C 1286.6045655375551,179.8619293078056 1363.3022827687776,177.4309646539028 1440,175 L 1440,700 L 0,700 Z"
                fill="url(#gradient)" fillOpacity="0.53" stroke="none"
                strokeWidth="0"
            />
            <defs>
                <linearGradient id="gradient" x1="60%" x2="40%" y1="1%" y2="99%">
                    <stop offset="5%" stopColor="#2563eb"/>
                    <stop offset="95%" stopColor="#db2777"/>
                </linearGradient>
            </defs>
            <path className="animate-path-1 transition-all delay-150 duration-300 ease-in-out"
                d="M 0,700 L 0,408 C 48.57824005891017,351.4930044182621 97.15648011782034,294.98600883652426 149,321 C 200.84351988217966,347.01399116347574 255.9523195876289,455.54896907216505 330,477 C 404.0476804123711,498.45103092783495 497.0342415316642,432.81811487481593 554,405 C 610.9657584683358,377.18188512518407 631.9107142857142,387.1785714285714 689,405 C 746.0892857142858,422.8214285714286 839.3229013254786,448.46759941089834 914,431 C 988.6770986745214,413.53240058910166 1044.7976804123712,352.9510309278351 1099,327 C 1153.2023195876288,301.0489690721649 1205.486377025037,309.7282768777614 1262,329 C 1318.513622974963,348.2717231222386 1379.2568114874816,378.1358615611193 1440,408 L 1440,700 L 0,700 Z"
                fill="url(#gradient)" fillOpacity="1" stroke="none"
                strokeWidth="0"
            />
        </svg>
    );
};

const TabContainer = () => {
    return (
        <div className="relative col-span-4 overflow-hidden bg-gray-200"
            // style="box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 40px inset;"
        >
            <div className="absolute inset-x-0 bottom-0"><TabContainerSvg/></div>
            <div
                className="relative  col-span-4 grid grid-cols-1 flex-col overflow-hidden border-x border-b border-dashed border-black/5 bg-white/10 lg:grid-cols-2">
                <div className="fade-in-up relative m-4 flex flex-col bg-white/80 p-4 pr-8 backdrop-blur-2xl">
                    <div
                        className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-2xl shadow-gray-900/20"/>
                    <h1 className="mb-2 text-xl font-semibold text-gray-950">Global card acceptance
                    </h1>
                    <p className="text-start text-sm text-gray-800">
                        Open your business to the world. Sell digital
                        goods and services seamlessly with 1 click checkout. Tap into the most popular payment
                        methods, empowering your business to drive revenue instantly and securely, wherever your
                        customers are.
                    </p>
                    <a
                        className="mt-8 flex items-center space-x-1 text-base text-blue-600 transition hover:opacity-70"
                        href="/contact"
                    >
                        <span>Let&apos;s chat</span>

                    </a></div>
            </div>
        </div>
    );
};

export const Services: React.FC = () => {
    const [selected, setSelected] = React.useState('photos');

    return (
        <div className="col-span-4 flex w-full flex-col">
            <Tabs
                aria-label="Options"
                classNames={{
                    tabList: 'grid md:flex grid-cols-2 flex-1',
                    // tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
                    // cursor: 'w-full bg-[#22d3ee]',
                    panel: 'px-0',
                    tab: 'justify-start md:justify-center',
                    // tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
                }}
                color="primary"
                selectedKey={selected}
                variant="underlined"

                onSelectionChange={setSelected as any}
            >
                <Tab key="photos" title="Photos">
                    <TabContainer/>
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardBody>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur.
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                            anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};
