'use client';

import React, { useMemo } from 'react';
import { Button } from '@heroui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface FilterClearButtonProps {
    searchKeys: string[]
}

export const FilterClearButton: React.FC<FilterClearButtonProps> = React.memo((props) => {
    const { searchKeys } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const isFiltered = useMemo(() => {
        return searchKeys.some((key) => searchParams.has(key));
    }, [searchKeys, searchParams]);

    const handleClear = () => {
        const newParams = new URLSearchParams(searchParams);

        searchKeys.forEach((key) => newParams.delete(key));

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <Button
            className={cn('border-1 border-dashed border-default', { 'text-primary border-solid': isFiltered })}
            isIconOnly={true}
            size="sm"
            startContent={<Icons.filterCross/>}
            variant={isFiltered ? 'flat' : 'bordered'}
            onPress={handleClear}
        />
    );
});
