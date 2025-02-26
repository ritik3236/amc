'use client';

import React, { useEffect } from 'react';
import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input } from '@heroui/input';
import { SharedSelection } from '@heroui/system';
import { useDebounceFn } from 'ahooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import { fnCapitalize } from '@/lib/utils';

interface OwnProps {
    searchOptions: {
        key: string
        label: string
    }[];
}

interface SearchParms extends OwnProps {
    searchFilter: string;
    handleSearchFilter: (keys: SharedSelection) => void;
}

const SearchStartContent: React.FC<SearchParms> = React.memo((props) => {
    const { searchOptions, searchFilter, handleSearchFilter } = props;

    const activeItem = searchOptions.find((item) => item.key === searchFilter);

    const isSingleOption = searchOptions.length === 1;

    return (
        <Dropdown
            aria-label="Search filter selection"
            isDisabled={isSingleOption}
            placement="bottom-start"
        >
            <DropdownTrigger>
                <Button className="shrink-0 gap-1 rounded-r-none" size="sm" variant="flat">
                    {fnCapitalize(activeItem?.label)}
                    {!isSingleOption && <Icons.chevronDown/>}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection={true}
                hideSelectedIcon={true}
                selectedKeys={[searchFilter]}
                selectionMode="single"
                onSelectionChange={handleSearchFilter}
            >
                {searchOptions.map((item) => (
                    <DropdownItem key={item.key}>
                        {fnCapitalize(item.label)}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
});

export const FilterBySearch: React.FC<OwnProps> = (props) => {
    const { searchOptions } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [searchValue, setSearchValue] = React.useState('');
    const [searchKey, setSearchKey] = React.useState(() => {
        return searchOptions[0]?.key ?? '';
    });

    useEffect(() => {
        const option = searchOptions.find((opt) => searchParams.has(opt.key));

        if (option) {
            setSearchKey(option.key);
            setSearchValue(searchParams.get(option.key) ?? '');
        }
    }, []);

    const { run } = useDebounceFn((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set(searchKey, term);
        } else {
            params.delete(searchKey);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, { wait: 500 });

    const handleSearchOptionFilter = (key: SharedSelection) => {
        setSearchKey(key.currentKey);
        const params = new URLSearchParams(searchParams);
        const searchOptionKeys = searchOptions.map((option) => option.key);

        searchOptionKeys.forEach((k) => {
            params.delete(k);
        });

        setSearchValue('');
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Input
            classNames={{ base: 'w-[250px]', inputWrapper: 'px-0' }}
            defaultValue=""
            isClearable={false}
            placeholder="Search..."
            size="sm"
            startContent={
                <SearchStartContent
                    handleSearchFilter={handleSearchOptionFilter}
                    searchFilter={searchKey}
                    searchOptions={props.searchOptions}
                />
            }
            value={searchValue}
            variant="flat"
            onValueChange={(v) => {
                run(v);
                setSearchValue(v);
            }}
        />
    );
};
