import { revalidatePath } from 'next/cache';

import { headers as next_headers } from 'next/headers';

import { getConfig } from '@/actions';
import { auth } from '@/auth';
import { decryptToken } from '@/lib/encryption';
import { buildQueryString } from '@/lib/utils';

/**
 * Constants for API requests
 */
const APIs = {
    'peatio': 'api/v2/peatio',
    'barong': 'api/v2/barong',
};

interface ApiRequestParams {
    endpoint: string;
    apiVersion: 'peatio' | 'barong';
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    payload?: Record<string, any> | null;
    headers?: Record<string, string>;
    cache?: boolean;
    pathToRevalidate?: string[];
    purgeCache?: boolean;
    isPublic?: boolean;
}

export interface ApiResponse<T = any> {
    success: boolean;
    error: string | null;
    data: T | null;
    headers?: { total: string, currentPage: string, 'perPage': string };
}

/**
 * Perform an API request with granular control via a params object
 * @param params - Configuration for the API request
 * @returns A promise resolving to the API response
 */
export async function makeApiRequest<T = any>(params: ApiRequestParams): Promise<ApiResponse<T>> {
    const {
        endpoint,
        apiVersion,
        method = 'GET',
        payload = null,
        headers = {},
        cache = false,
        isPublic = false,
        purgeCache = false,

        pathToRevalidate,
    } = params;

    return { data: null, success: false, error: 'Login is currently disabled, Try again later.' };

    const session = await auth();

    const headersList = next_headers();
    const config = await getConfig();

    const ip = headersList.get('x-forwarded-for') || 'IP Not Found';
    const _user_agent = headersList.get('user-agent') || 'unknown';

    const endpointPath = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const barongSession = isPublic ? '' : await decryptToken(session.user?.access_token);
    const csrfToken = isPublic ? '' : await decryptToken(session.user?.csrf_token);

    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/${APIs[apiVersion]}/${endpointPath}`;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Cookie': `${config.sessionCookieName}=${barongSession}`,
        'X-Forwarded-For': ip,
        // 'User-Agent': user_agent,
    };

    if (method === 'GET' && payload) {

        //FixMe: Ensure state is always an array
        const processedPayload = Object.fromEntries(
            Object.entries(payload).map(([key, value]) => [
                key,
                key === 'state' ? (Array.isArray(value) ? value : [value]) : value,
            ])
        );

        url += buildQueryString(processedPayload);

    } else {
        defaultHeaders['X-CSRF-Token'] = csrfToken;
    }

    try {
        console.info('Making request :-', url);

        const res = await fetch(url, {
            body: (method !== 'GET' && payload) ? JSON.stringify(payload) : null,
            headers: { ...defaultHeaders, ...headers },
            method,
            next: { revalidate: cache ? 3600 : 0 },
        });

        const isSuccessful = res.ok;
        const resHeaders: ApiResponse['headers'] = {
            total: res.headers.get('total') ?? '0',
            currentPage: res.headers.get('page') ?? '1',
            perPage: res.headers.get('per-page') ?? '100',
        };

        const responseData = await parseResponse<T>(res);

        if (isSuccessful) {
            if (purgeCache) {
                revalidatePath('/dashboard', 'layout');
            }

            if (pathToRevalidate?.length > 0) {
                for (const path of pathToRevalidate) {
                    revalidatePath(path, 'page');
                }
            }

            return { data: responseData, error: null, headers: resHeaders, success: true };
        }

        console.info('API request failed', res.status, responseData);

        return {
            data: null,
            // @ts-ignore
            error: responseData?.errors?.[0] || responseData?.errors || `Error: ${res.status} ${res.statusText}`,
            headers: resHeaders,
            success: false,
        };
    } catch (error) {
        console.error('apiRequest - unexpected error:', error);

        return {
            data: null,
            error: 'An unexpected error occurred. Please try again later.',
            headers: null,
            success: false,
        };
    }
}

/**
 * Parse response safely
 * @param res - The fetch response object
 * @returns A promise resolving to parsed JSON or null if parsing fails
 */
export async function parseResponse<T>(res: Response): Promise<T | null> {
    try {
        return await res.json();
    } catch (error) {
        console.warn('Failed to parse JSON:', error, res);

        return null;
    }
}
