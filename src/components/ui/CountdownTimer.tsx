'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@heroui/progress';

import { Duration } from 'luxon';

interface OwnProps {
    startTime?: string | number | Date;
    endTime: string | number | Date;
}

export const CountdownTimer: React.FC<OwnProps> = React.memo(({ startTime, endTime }) => {
    const initialNow = useRef(Date.now());
    const [now, setNow] = useState(initialNow.current);

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const start = startTime ? new Date(startTime).getTime() : initialNow.current;
    const end = new Date(endTime).getTime();

    const totalDuration = Math.max(end - start, 0);
    const remainingTime = Math.max(end - Math.max(now, start), 0);

    const remainingPercent = totalDuration > 0
        ? (remainingTime / totalDuration) * 100
        : 0;

    const progressColor = remainingTime === 0
        ? 'danger'
        : remainingPercent < 25
            ? 'warning'
            : 'success';

    const formattedTime = Duration.fromMillis(remainingTime).toFormat('hh:mm:ss');

    return (
        <div className="flex items-center gap-2">
            <CircularProgress
                aria-label="time left..."
                color={progressColor}
                size="md"
                strokeWidth={3}
                value={remainingPercent}
            />
            <p className="flex flex-col">
                <span>Expires in:</span>
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <span className={`text-${progressColor} font-semibold`}>{formattedTime}</span>
            </p>
        </div>
    );
});
