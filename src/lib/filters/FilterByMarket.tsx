'use client';

import React, { useMemo } from 'react';

import { Icons } from '@/components/icons';
import { useMarketFetch } from '@/hooks';
import { FilterBySingleKey } from '@/lib/filters';

export const FilterByMarket: React.FC = () => {
    const { data: markets } = useMarketFetch();

    const filterOptions = useMemo(() => {
        return markets?.data?.map((v) => ({
            key: v.id,
            label: v.id.toUpperCase(),
            c_id: v.base_unit,
        })) || [];
    }, [markets]);

    return (
        <FilterBySingleKey
            filterKey="market"
            filterLabel="Market"
            filterOptions={filterOptions}
            isMarket={true}
            startIcon={<Icons.coins/>}
        />
    );
};
