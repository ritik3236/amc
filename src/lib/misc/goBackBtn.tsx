'use client';

import React from 'react';

import { Button } from '@heroui/button';
import { ButtonProps } from '@heroui/button/dist/button';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/icons';

interface OwnProps extends ButtonProps {
    children?: React.ReactNode;
}

export const GoBackBtn: React.FC<OwnProps> = (props) => {
    const router = useRouter();

    return (
        <Button
            {...props}
            onPress={router.back}
        >
            {props.children
                ? props.children
                : <React.Fragment>
                    <Icons.arrowLeft/>
                    <span className="text-tiny">Go Back</span>
                </React.Fragment>
            }
        </Button>
    );
};
