import React, { useMemo } from 'react';

import { Icons } from '@/components/icons';
import { ExtendedCurrencyInterface, useCurrencyFetch } from '@/hooks';
import { FilterBySingleKey } from '@/lib/filters/FilterBySingleKey';

interface OwnProps {
    type: ExtendedCurrencyInterface['type'];
    filterKey?: string;
    filterLabel?: string;
}

export const FilterByCurrency: React.FC<OwnProps> = (props) => {
    const { type, filterLabel, filterKey } = props;

    const { data: currencies } = useCurrencyFetch({ type });

    const filterOptions = useMemo(() => {
        return currencies?.data?.map((v) => ({
            key: v.id,
            label: v.id.toUpperCase(),
        })) || [];
    }, [currencies]);

    return (
        <FilterBySingleKey
            filterKey={filterKey || 'currency'}
            filterLabel={filterLabel || 'Currency'}
            filterOptions={filterOptions}
            isCurrency={true}
            startIcon={<Icons.coins/>}
        />
    );
};
