'use client';

import React, { useState } from 'react';

import { Button } from '@heroui/button';

import { revalidateAllPaths } from '@/actions';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export const RefreshButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleButtonClick = async () => {
        try {
            setIsLoading(true);
            await revalidateAllPaths();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            isIconOnly={true}
            radius="full"
            startContent={
                <Icons.refresh className={cn('text-default-500', { 'animate-spinner-ease-spin': isLoading })}/>
            }
            variant="light"
            onPress={handleButtonClick}
        />
    );
};
