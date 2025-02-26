'use server';

import { PageParams } from '@/actions';
import { ApiResponse, makeApiRequest } from '@/lib/api';
import { generateRandomId } from '@/lib/utils';
import { OtcOrderFormInterface, OtcOrderInterface, OtcQuoteFormInterface, OtcQuoteInterface } from '@/lib/zod';

export interface GetOtcQuoteListParams extends PageParams {
    market?: string;
    quote_id?: string;
    state?: string;
}

export interface GetOtcOrderListParams extends PageParams {
    client_reference_id?: string;
    market?: string;
    state?: string;
    side?: string; // buy or sell side
}

export async function getOtcConversionRate(payload: OtcQuoteFormInterface): Promise<ApiResponse<OtcQuoteInterface>> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/market/otc_quotes/new',
        method: 'POST',
        payload,
        purgeCache: true,
    });
}

export async function getOtcQuoteById(payload: { quote_id: string }): Promise<ApiResponse<OtcQuoteInterface>> {
    const response = await makeApiRequest<OtcQuoteInterface>({
        apiVersion: 'peatio',
        endpoint: '/market/otc_quotes/status',
        method: 'GET',
        payload,
    });

    return { ...response, data: response?.data?.[0] || null };
}

export async function getOtcQuoteList(payload?: GetOtcQuoteListParams): Promise<ApiResponse<OtcQuoteInterface[]>> {
    return await makeApiRequest<OtcQuoteInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/market/otc_quotes/status',
        method: 'GET',
        payload,
    });
}

export async function createOtcOrderWithQuoteId(payload: { quote_id: string }): Promise<ApiResponse<OtcOrderInterface>> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: `/market/otc_quotes/place_order/${payload.quote_id}`,
        method: 'PATCH',
        payload,
    });
}

export async function createOtcOrder(payload: OtcOrderFormInterface): Promise<ApiResponse<OtcOrderInterface>> {
    const data = { ...payload, client_reference_id: generateRandomId() };

    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/market/otc_orders',
        method: 'POST',
        payload: data,
        purgeCache: true,
    });
}

export async function getOtcOrderList(payload: GetOtcOrderListParams): Promise<ApiResponse<OtcOrderInterface[]>> {
    return await makeApiRequest<OtcOrderInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/market/otc_orders',
        method: 'GET',
        payload,
    });
}
