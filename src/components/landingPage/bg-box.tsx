'use client';
import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const rows = new Array(150).fill(1);
    const cols = new Array(100).fill(1);
    let colors = [
        '--sky-300',
        '--pink-300',
        '--green-300',
        '--yellow-300',
        '--red-300',
        '--purple-300',
        '--blue-300',
        '--indigo-300',
        '--violet-300',
    ];
    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div
            className={cn(
                'absolute left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ',
                className
            )}
            style={{
                transform: 'translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)',
            }}
            {...rest}
        >
            {rows.map((_, i) => (
                <motion.div
                    key={'row' + i}
                    className="relative h-8  w-16  border-l border-foreground-50"
                >
                    {cols.map((_, j) => (
                        <motion.div
                            key={'col' + j}
                            animate={{
                                transition: { duration: 2 },
                            }}
                            className="relative h-8  w-16 border-r border-t border-foreground-50"
                            whileHover={{
                                backgroundColor: `var(${getRandomColor()})`,
                                transition: { duration: 0 },
                            }}
                        >
                            {j % 2 === 0 && i % 2 === 0 ? (
                                <svg
                                    className="pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 stroke-[1px] text-background"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 6v12m6-6H6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : null}
                        </motion.div>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
