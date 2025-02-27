'use client';

import React, { useMemo } from 'react';
import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CryptoIcon } from '@/lib/misc';
import { cn, fnCapitalize } from '@/lib/utils';

interface FilterSingleValueProps {
    startIcon: React.ReactNode;
    filterKey: string;
    filterLabel: string;
    isCurrency?: boolean;
    isMarket?: boolean;
    filterOptions: { key: string; label: string, c_id?: string }[];
}

export const FilterBySingleKey: React.FC<FilterSingleValueProps> = (props) => {
    const { filterKey, startIcon, isCurrency, isMarket, filterLabel, filterOptions } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentFilter = useMemo(() => {
        const values = searchParams.getAll(filterKey);

        return values.length > 0 ? values[0] : null;
    }, [filterKey, searchParams]);

    const handleStatusToggle = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (currentFilter === value) {
            newParams.delete(filterKey);
        } else {
            newParams.set(filterKey, value);
        }

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
        <Dropdown placement="bottom-start" showArrow={true}>
            <DropdownTrigger>
                <Button
                    className={cn('border border-dashed border-default text-default-500', {
                        'border-solid': !!currentFilter,
                    })}
                    size="sm"
                    variant="light"
                >
                    {startIcon} {filterLabel}
                    {currentFilter && (
                        <div className="flex items-center gap-1 border-l border-dashed border-default pl-2">
                            {isCurrency ?
                                <CryptoIcon code={currentFilter} size={16}/>
                                : <div className="font-semibold text-primary">
                                    {fnCapitalize(filterOptions.find((o) => o.key === currentFilter)?.label || currentFilter)}
                                </div>
                            }
                        </div>
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                closeOnSelect={false}
                selectedKeys={currentFilter ? [currentFilter] : []}
                selectionMode="single"
            >
                {filterOptions.map((option) => (
                    <DropdownItem
                        key={option.key}
                        textValue={option.key}
                        onPress={() => handleStatusToggle(option.key)}
                    >
                        <div className="flex items-center gap-2">
                            {isCurrency && <CryptoIcon code={option.key} size={16}/>}
                            {isMarket && <CryptoIcon code={option.c_id} size={16}/>}
                            <span>{fnCapitalize(option.label)}</span>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
