'use client';

import React from 'react';

import { useScrollColors } from '@/hooks/useScrollColors';

export const BgCircle: React.FC = () => {
    const bgColors = useScrollColors(['red', 'blue', 'yellow'], [300, 500, 400, 600]);

    return (
        <div className="fixed inset-x-0 bottom-0 z-0 flex items-center justify-between">
            <div className={` bg-${bgColors[0]} a-delay-0 h-40 w-1/5 animate-move rounded-full contrast-150 transition-all duration-500`}/>
            <div className={` bg-${bgColors[1]}  h-40 w-1/5 animate-move rounded-full transition-all duration-500 a-delay-1`}/>
            <div className={` bg-${bgColors[2]} h-40 w-1/5 animate-move rounded-full contrast-200 transition-all duration-500 a-delay-2`}/>
            <div className={` bg-${bgColors[3]} h-40 w-1/5 animate-move rounded-full a-delay-3`}/>
        </div>
    );
};
