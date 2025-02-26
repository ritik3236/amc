import { useQuery } from '@tanstack/react-query';

import { getCurrencyList, GetCurrencyListParams } from '@/actions';

export interface ExtendedCurrencyInterface {
    type: GetCurrencyListParams['type'] | 'all';
}

export const useCurrencyFetch = (payload?: ExtendedCurrencyInterface) => {
    const { type = 'all' } = payload || {};

    return useQuery({
        queryKey: ['currencies', type],
        queryFn: () => getCurrencyList({ ...(type === 'all' ? {} : { type }) }),
    });
};
