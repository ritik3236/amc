'use client';

import { useRef } from 'react';
import DottedMap from 'dotted-map';
import { motion } from 'motion/react';
import Image from 'next/image';

interface MapProps {
    dots?: Array<{
        start: { lat: number; lng: number; label?: string };
        end: { lat: number; lng: number; label?: string };
    }>;
    lineColor?: string;
}

export function WorldMap({
    dots = [],
    lineColor = '#0ea5e9',
}: MapProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const map = new DottedMap({ height: 100, grid: 'diagonal', countries: ['IND'] });

    const svgMap = map.getSVG({
        radius: 0.22,
        color: '#838588',
        shape: 'circle',
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);

        return { x, y };
    };

    const createCurvedPath = (
        start: { x: number; y: number },
        end: { x: number; y: number }
    ) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;

        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    return (
        <div className="relative aspect-[2/1] w-full rounded-lg   font-sans ">
            <Image
                alt="world map"
                className="pointer-events-none size-full select-none"
                draggable={false}
                height="495"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
                width="1056"
            />
            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 size-full select-none"
                viewBox="0 0 800 400"
            >
                {dots.map((dot, i) => {
                    const startPoint = projectPoint(dot.start.lat, dot.start.lng);
                    const endPoint = projectPoint(dot.end.lat, dot.end.lng);

                    return (
                        <g key={`path-group-${i}`}>
                            <motion.path
                                key={`start-upper-${i}`}
                                animate={{
                                    pathLength: 1,
                                }}
                                d={createCurvedPath(startPoint, endPoint)}
                                fill="none"
                                initial={{
                                    pathLength: 0,
                                }}
                                stroke="url(#path-gradient)"
                                strokeWidth="1"
                                transition={{
                                    duration: 1,
                                    delay: 0.5 * i,
                                    ease: 'easeOut',
                                }}
                            />
                        </g>
                    );
                })}

                <defs>
                    <linearGradient id="path-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0"/>
                        <stop offset="5%" stopColor={lineColor} stopOpacity="1"/>
                        <stop offset="95%" stopColor={lineColor} stopOpacity="1"/>
                        <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                </defs>

                {dots.map((dot, i) => (
                    <g key={`points-group-${i}`}>
                        <g key={`start-${i}`}>
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                fill={lineColor}
                                r="2"
                            />
                            <circle
                                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                                fill={lineColor}
                                opacity="0.5"
                                r="2"
                            >
                                <animate
                                    attributeName="r"
                                    begin="0s"
                                    dur="1.5s"
                                    from="2"
                                    repeatCount="indefinite"
                                    to="8"
                                />
                                <animate
                                    attributeName="opacity"
                                    begin="0s"
                                    dur="1.5s"
                                    from="0.5"
                                    repeatCount="indefinite"
                                    to="0"
                                />
                            </circle>
                        </g>
                        <g key={`end-${i}`}>
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                fill={lineColor}
                                r="2"
                            />
                            <circle
                                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                                fill={lineColor}
                                opacity="0.5"
                                r="2"
                            >
                                <animate
                                    attributeName="r"
                                    begin="0s"
                                    dur="1.5s"
                                    from="2"
                                    repeatCount="indefinite"
                                    to="8"
                                />
                                <animate
                                    attributeName="opacity"
                                    begin="0s"
                                    dur="1.5s"
                                    from="0.5"
                                    repeatCount="indefinite"
                                    to="0"
                                />
                            </circle>
                        </g>
                    </g>
                ))}
            </svg>
        </div>
    );
}
