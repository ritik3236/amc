import React from 'react';

import { Icons } from '@/components/icons';
import { FilterBySingleKey } from '@/lib/filters';

const FILTER_OPTIONS = [
    { key: 'buy', label: 'Buy' },
    { key: 'sell', label: 'Sell' },
];

export const FilterBySide: React.FC = () => {
    return (
        <FilterBySingleKey
            filterKey="side"
            filterLabel="Side"
            filterOptions={FILTER_OPTIONS}
            startIcon={<Icons.arrowRightLeft className="rotate-90"/>}
        />
    );
};
