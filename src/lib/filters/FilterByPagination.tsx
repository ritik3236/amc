'use client';

import React from 'react';
import { Pagination } from '@heroui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ApiResponse } from '@/lib/api';

type OwnProps = ApiResponse['headers'] & {
    children?: React.ReactNode
};

export const FilterByPagination: React.FC<OwnProps> = (props) => {
    const { total, perPage, currentPage } = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const totalPage = Math.ceil(+total / +perPage);

    const onRowPerPageChange = (value: string) => {
        if (+value < 1) return;

        const params = new URLSearchParams(searchParams);

        params.set('limit', value);
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
    };

    const onPageChange = (page: number) => {
        if (+page < 1) return;

        const params = new URLSearchParams(searchParams);

        params.set('page', page.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div
            className="sticky bottom-0 z-10 flex items-center justify-end border-t border-default p-2 backdrop-blur-md">
            <div className="mr-4">{props.children}</div>
            <div className="mr-8 flex items-center gap-4 text-small text-default-500">
                <label className="flex items-center ">
                    Rows per page:
                    <select
                        className="bg-transparent outline-none"
                        value={perPage}
                        onChange={(e) => onRowPerPageChange(e.target.value)}
                    >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>
                </label>
                <span>Total - {total}</span>
            </div>
            <Pagination
                classNames={{ base: 'm-0 p-0.5' }}
                color="default"
                isCompact={true}
                page={+currentPage}
                showControls={true}
                size="sm"
                total={+totalPage}
                variant="flat"
                onChange={onPageChange}
            />
        </div>
    );
};
