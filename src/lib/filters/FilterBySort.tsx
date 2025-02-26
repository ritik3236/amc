'use client';

import React, { useMemo } from 'react';
import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn, fnCapitalize } from '@/lib/utils';

interface SortOption {
    key: string;
    label: string;
    defaultDirection: 'asc' | 'desc' | string;
}

interface OwnProps {
    options: SortOption[];
}

export const FilterBySort: React.FC<OwnProps> = (props) => {
    const { options } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentSorts = useMemo(() => {
        return Object.fromEntries(
            options
                .map(({ key }) => [key, searchParams.get(key)?.toLowerCase()])
                .filter(([, value]) => value === 'asc' || value === 'desc')
        );
    }, [options, searchParams]);

    const isSorted = Boolean(Object.keys(currentSorts).length);

    const handleSortChange = (selectedKey: string) => {
        const [sortKey, currentDirection] = selectedKey.split(':') as [string, 'asc' | 'desc'];
        const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';

        const newParams = new URLSearchParams(searchParams);

        newParams.set(sortKey, newDirection);
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const handleClearSort = (key: string) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.delete(key);
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const getSortDirection = (option: SortOption) => currentSorts[option.key] || null;
    const selectedKeys = Object.entries(currentSorts).map(([key, direction]) => `${key}:${direction}`);

    return (
        <Dropdown placement="bottom-start" showArrow={true}>
            <DropdownTrigger>
                <Button
                    className={cn('border border-dashed border-default text-default-500', {
                        'border-solid': isSorted,
                    })}
                    size="sm"
                    variant="light"
                >
                    <Icons.listFilter/> Sort by
                    {isSorted && (
                        <div className="flex items-center gap-1 border-l border-dashed border-default pl-2">
                            {Object.entries(currentSorts).map(([key, _dir], index) => (
                                <span key={key} className="flex items-center gap-1 font-semibold text-primary">
                                    {fnCapitalize(options.find((o) => o.key === key)?.label || key)}
                                    {index !== Object.keys(currentSorts).length - 1 && ','}
                                </span>
                            ))}
                        </div>
                    )}
                </Button>
            </DropdownTrigger>

            <DropdownMenu
                closeOnSelect={false}
                hideSelectedIcon={true}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                onAction={handleSortChange}
            >
                {options.map((option) => {
                    const currentDirection = getSortDirection(option);
                    const displayDirection = currentDirection || option.defaultDirection;

                    return (
                        <DropdownItem
                            key={`${option.key}:${displayDirection}`}
                            endContent={currentDirection && (
                                <Icons.cancel
                                    className="text-default-400 hover:text-danger"
                                    onClick={() => handleClearSort(option.key)}
                                />
                            )}
                            textValue={`${option.key}:${displayDirection}`}
                        >
                            <div className="flex items-center justify-between">
                                <span>
                                    {fnCapitalize(option.label)}
                                    <span className="ml-2 text-default-400">
                                        ({currentDirection ? `${currentDirection}` : 'default'})
                                    </span>
                                </span>
                            </div>
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
};
