'use client';

import React from 'react';
import { DotLottieReact, DotLottieReactProps } from '@lottiefiles/dotlottie-react';

export const LottieContainer: React.FC<DotLottieReactProps> = (props) => {
    return (
        <DotLottieReact{...props}/>
    );
};
