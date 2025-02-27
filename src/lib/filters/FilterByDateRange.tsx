'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { Button } from '@heroui/button';
import { DateRangePicker } from '@heroui/date-picker';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { cn, fnCapitalize } from '@/lib/utils';

const dateOptions = [
    { key: 'today', label: 'Today' },
    { key: 'last_7_days', label: 'Last 7 days' },
    { key: 'last_30_days', label: 'Last 30 days' },
    { key: 'last_3_months', label: 'Last 3 months' },
    { key: 'last_6_months', label: 'Last 6 months' },
    { key: 'last_12_months', label: 'Last 12 months' },
] as const;

type DateOptionKey = typeof dateOptions[number]['key'];

const getDateRange = (key: DateOptionKey): RangeValue<CalendarDate> => {
    const now = today(getLocalTimeZone());

    let start = now;

    switch (key) {
        case 'last_7_days':
            start = now.subtract({ days: 7 });
            break;
        case 'last_30_days':
            start = now.subtract({ days: 30 });
            break;
        case 'last_3_months':
            start = now.subtract({ months: 3 });
            break;
        case 'last_6_months':
            start = now.subtract({ months: 6 });
            break;
        case 'last_12_months':
            start = now.subtract({ months: 12 });
            break;
    }

    return { start, end: now.add({ days: 2 }) };
};

const formatDateForURL = (date: CalendarDate): string => {
    const zonedDate = date.toDate(getLocalTimeZone());

    return encodeURIComponent(zonedDate.toISOString());
};

export const FilterByDateRange: React.FC = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [currentFilter, setCurrentFilter] = React.useState<DateOptionKey | 'custom' | null>(null);
    const [filteredDate, setFilteredDate] = React.useState<RangeValue<CalendarDate> | null>(null);

    const isUrlFiltered = useMemo(() => {
        return searchParams.has('from') && searchParams.has('to');
    }, [searchParams]);

    useEffect(() => {
        if (!isUrlFiltered) {
            setFilteredDate(null);
            setCurrentFilter(null);
        }

    }, [isUrlFiltered]);

    const handleDateToggle = useCallback((filterKey: DateOptionKey) => {
        const params = new URLSearchParams(searchParams);

        if (currentFilter === filterKey) {
            setCurrentFilter(null);
            params.delete('from');
            params.delete('to');
        } else {
            setCurrentFilter(filterKey);

            const range = getDateRange(filterKey);

            setFilteredDate(range);
            params.set('from', formatDateForURL(range.start));
            params.set('to', formatDateForURL(range.end));
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, [currentFilter, pathname, router, searchParams]);

    const handleCustomDateChange = useCallback((value: RangeValue<CalendarDate>) => {
        const params = new URLSearchParams(searchParams);

        setFilteredDate(value);
        if (value?.start || value?.end) {
            setCurrentFilter('custom');

            params.set('from', formatDateForURL(value.start));
            params.set('to', formatDateForURL(value.end.add({ days: 1 })));
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [pathname, router, searchParams]);

    const handleClearDate = () => {
        setCurrentFilter(null);
        setFilteredDate(null);
        const params = new URLSearchParams(searchParams);

        params.delete('from');
        params.delete('to');
        router.replace(`${pathname}?${params.toString()}`);
    };

    const selectedFilter = dateOptions.find((o) => o.key === currentFilter);
    const isCustom = currentFilter === 'custom' || (!currentFilter && isUrlFiltered);

    const isFilterActive = !!currentFilter || isCustom;

    return (
        <Dropdown placement="bottom-start" showArrow={true}>
            <DropdownTrigger>
                <Button
                    className={cn('border border-dashed border-default text-default-500', {
                        'border-solid': isFilterActive,
                    })}
                    size="sm"
                    variant="light"
                >
                    <Icons.calendar/> Date
                    {isFilterActive && (
                        <div className="flex items-center gap-1 border-l border-dashed border-default pl-2">
                            <div className="font-semibold text-primary">
                                {isCustom ? 'Custom' : fnCapitalize(selectedFilter?.label)}
                            </div>
                        </div>
                    )}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                closeOnSelect={false}
                selectedKeys={[currentFilter]}
                selectionMode="single"
            >
                <React.Fragment>
                    {dateOptions.map((option) => (
                        <DropdownItem
                            key={option.key}
                            textValue={option.key}
                            onPress={() => handleDateToggle(option.key)}
                        >
                            <div className="flex items-center gap-2">
                                <span>{fnCapitalize(option.label)}</span>
                            </div>
                        </DropdownItem>
                    ))}
                    <DropdownItem
                        key="custom"
                        className="!bg-transparent p-0"
                        hideSelectedIcon={true}
                        textValue="custom"
                    >
                        <div className="flex items-center gap-0.5">
                            <DateRangePicker
                                aria-labelledby="Date Picker"
                                maxValue={today(getLocalTimeZone()).add({ days: 1 })}
                                showMonthAndYearPickers={true}
                                size="sm"
                                value={filteredDate}
                                onChange={handleCustomDateChange}
                            />
                            <Button
                                isIconOnly={true}
                                size="sm"
                                variant="flat"
                                onPress={handleClearDate}
                            >
                                <Icons.cancel className="text-primary" size="16"/>
                            </Button>
                        </div>
                    </DropdownItem>
                </React.Fragment>
            </DropdownMenu>
        </Dropdown>
    );
};
