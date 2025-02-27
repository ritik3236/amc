'use server';

import { defaultPlatformConfig, PlatformConfig } from '@/config/platform';
import { ApiResponse, makeApiRequest, parseResponse } from '@/lib/api';
import { ContactUsFormInterface, CurrencyInterface, MarketInterface } from '@/lib/zod';

export interface GetCurrencyListParams {
    type?: 'fiat' | 'coin';
}

export async function getMarketList(): Promise<ApiResponse<MarketInterface[]>> {
    return await makeApiRequest<MarketInterface[]>({
        apiVersion: 'peatio',
        cache: true,
        endpoint: '/public/markets',
        isPublic: true,
    });
}

export async function getCurrencyList(payload?: GetCurrencyListParams): Promise<ApiResponse<CurrencyInterface[]>> {
    return await makeApiRequest<CurrencyInterface[]>({
        apiVersion: 'peatio',
        cache: true,
        endpoint: '/public/currencies',
        isPublic: true,
        payload,
    });
}

export async function doContactUs(payload: ContactUsFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/public/currencies',
        isPublic: true,
        method: 'GET',
        payload,
    });
}

export async function getConfig(): Promise<PlatformConfig> {
    const url = process.env.NEXT_PUBLIC_CONFIG_URL || process.env.NEXT_PUBLIC_BASE_URL + '/config.json';

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
        console.error('Failed to fetch config, using default config:');
        console.error(defaultPlatformConfig);

        return defaultPlatformConfig;
    }

    const config = await parseResponse(res) as PlatformConfig;

    return config || defaultPlatformConfig;
}
