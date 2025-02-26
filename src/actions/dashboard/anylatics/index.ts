'use server';

import { ApiResponse, makeApiRequest } from '@/lib/api';
import { AnalyticsInterface } from '@/lib/zod';

export async function fetchAnalytics(): Promise<ApiResponse<AnalyticsInterface>> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/account/payments',
        method: 'GET',
    });
}
