import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import Airbnb from '/public/airbnb.svg';
import Apple from '/public/apple.svg';
import Disney from '/public/disney.svg';
import Facebook from '/public/facebook.svg';
import Quora from '/public/quora.svg';
import Samsung from '/public/samsung.svg';
import Spark from '/public/spark.svg';

interface OwnProps {
    className?: string;
}

export const LogoCarousel: React.FC<OwnProps> = (props) => {
    const { className } = props;

    const logos = [
        { src: Facebook, alt: 'Facebook' },
        { src: Disney, alt: 'Disney' },
        { src: Airbnb, alt: 'Airbnb' },
        { src: Apple, alt: 'Apple' },
        { src: Spark, alt: 'Spark' },
        { src: Samsung, alt: 'Samsung' },
        { src: Quora, alt: 'Quora' },
    ];

    return (
        <div
            className={clsx('inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]', className)}
        >
            <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                {logos.map((logo, index) => (
                    <li key={index}>
                        <Image
                            alt={logo.alt}
                            className="brightness-50 contrast-125 dark:brightness-100 dark:filter-none"
                            src={logo.src}
                        />
                    </li>
                ))}
            </ul>
            <ul aria-hidden="true"
                className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                {logos.map((logo, index) => (
                    <li key={index}>
                        <Image
                            alt={logo.alt}
                            className="brightness-50 contrast-125 dark:brightness-100 dark:filter-none"
                            src={logo.src}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
