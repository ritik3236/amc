import { useQuery } from '@tanstack/react-query';

import { getMarketList } from '@/actions';

export const useMarketFetch = () => {
    return useQuery({
        queryKey: ['markets'],
        queryFn: () => getMarketList(),
    });
};
