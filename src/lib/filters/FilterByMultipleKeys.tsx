'use client';

import React, { useMemo } from 'react';
import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn, fnCapitalize } from '@/lib/utils';

interface FilterByMultipleValueProps {
    startIcon?: React.ReactNode;
    searchKey: string;
    searchLabel: string;
    searchOptions: { key: string; label: string }[];
    searchGroupMap?: Record<string, string[]>;
}

export const FilterByMultipleKeys: React.FC<FilterByMultipleValueProps> = (props) => {
    const { startIcon, searchKey, searchLabel, searchGroupMap, searchOptions } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentGroups = useMemo(() => {
        if (!searchGroupMap) {
            return new Set<any>();
        }

        const searchValues = new Set(searchParams.getAll(searchKey));

        return new Set(
            Object.entries(searchGroupMap)
                .filter(([, statuses]) => statuses.some((s) => searchValues.has(s)))
                .map(([group]) => group)
        );
    }, [searchGroupMap, searchKey, searchParams]);

    const handleGroupToggle = (groupKey: string) => {
        if (!searchGroupMap) {
            return;
        }

        const newParams = new URLSearchParams(searchParams);
        const searchValues = searchGroupMap[groupKey] || [];
        const currentValues = new Set(newParams.getAll(searchKey));

        if (currentGroups.has(groupKey)) {
            searchValues.forEach((key: string) => currentValues.delete(key));
        } else {
            searchValues.forEach((key: string) => currentValues.add(key));
        }

        newParams.delete(searchKey);
        currentValues.forEach((v) => newParams.append(searchKey, v));

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const currentStatuses = useMemo(() => {
        return new Set(searchParams.getAll(searchKey));
    }, [searchKey, searchParams]);

    const handleStatusToggle = (statusKey: string) => {
        const newParams = new URLSearchParams(searchParams);
        const currentValues = newParams.getAll(searchKey);

        if (currentValues.includes(statusKey)) {
            newParams.delete(searchKey);
            currentValues
                .filter((v) => v !== statusKey)
                .forEach((v) => newParams.append(searchKey, v));
        } else {
            newParams.append(searchKey, statusKey);
        }

        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const isByGroupToggle = searchGroupMap ? handleGroupToggle : handleStatusToggle;
    const isByGroup = searchGroupMap ? currentGroups : currentStatuses;

    return (
        <Dropdown placement="bottom-start" showArrow={true}>
            <DropdownTrigger>
                <Button
                    className={cn('border border-dashed border-default text-default-500', {
                        'border-solid': isByGroup.size > 0,
                    })}
                    size="sm"
                    variant="light"
                >
                    {startIcon || <Icons.slideFilter/>} {searchLabel}
                    {isByGroup.size > 0 && (
                        <div className="flex items-center gap-1 border-l border-dashed border-default pl-2">
                            {Array.from(isByGroup).map((searchKey, index) => (
                                <span key={searchKey} className="flex items-center gap-1 font-semibold text-primary">
                                    {fnCapitalize(searchOptions.find((o) => o.key === searchKey)?.label || searchKey)}
                                    {index !== isByGroup.size - 1 && ','}
                                </span>
                            ))}
                        </div>
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                closeOnSelect={false}
                selectedKeys={Array.from(isByGroup)}
                selectionMode="multiple"
            >
                {searchOptions.map((option) => (
                    <DropdownItem
                        key={option.key}
                        textValue={option.key}
                        onPress={() => isByGroupToggle(option.key)}
                    >
                        <div className="flex items-center justify-between">
                            <span>{fnCapitalize(option.label)}</span>
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};
