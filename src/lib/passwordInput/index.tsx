'use client';

import React, { useState } from 'react';
import { Input } from '@heroui/input';
import { UseInputProps } from '@heroui/input/dist/use-input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@heroui/shared-icons';

export const InputPassword = React.forwardRef<HTMLInputElement, UseInputProps>(({ ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const eyeIconClass = 'pointer-events-none text-2xl text-default-400';

    return (
        <Input
            ref={ref}
            aria-label="Password"
            autoComplete="off"
            endContent={
                <button className="focus:outline-none" type="button" onClick={() => setIsVisible((p) => !p)}>
                    {isVisible
                        ? <EyeSlashFilledIcon className={eyeIconClass}/>
                        : <EyeFilledIcon className={eyeIconClass}/>}
                </button>
            }
            type={isVisible ? 'text' : 'password'}
            {...props}
        />
    );
});
