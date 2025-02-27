'use server';

import { ApiResponse, makeApiRequest } from '@/lib/api';
import {
    ApiKeyFormInterface,
    ApiKeyResponseInterface,
    TwoFactorAuthFormInterface,
    TwoFactorAuthResponseInterface,
    UserInterface,
    UserPreferenceFormInterface,
} from '@/lib/zod';

export async function getProfile(): Promise<ApiResponse<UserInterface>> {
    return await makeApiRequest<UserInterface>({
        apiVersion: 'barong',
        cache: true,
        endpoint: '/resource/users/me',
    });
}

export async function getUserPreferences(): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/account/member_preferences',
        payload: {
            preference_type: 'selected_markets',
        },
    });
}

export async function updateUserPreferences(payload: UserPreferenceFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: '/account/member_preferences',
        method: 'POST',
        pathToRevalidate: ['/dashboard/settings/general'],
        payload: {
            preference_type: 'selected_markets',
            preference_value: JSON.stringify(payload),
        },
    });
}

export async function toggleTwoFactor(payload: TwoFactorAuthFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: `/resource/otp/${payload.status}`,
        method: 'POST',
        pathToRevalidate: ['/dashboard/settings/security'],
        payload: payload,
    });
}

export async function generateTwoFactorSecret(): Promise<ApiResponse<TwoFactorAuthResponseInterface>> {
    return await makeApiRequest<TwoFactorAuthResponseInterface>({
        apiVersion: 'barong',
        endpoint: '/resource/otp/generate_qrcode',
        method: 'POST',
    });
}

export async function generateApiKey(payload: ApiKeyFormInterface): Promise<ApiResponse<ApiKeyResponseInterface>> {
    return await makeApiRequest<ApiKeyResponseInterface>({
        apiVersion: 'barong',
        endpoint: '/resource/api_keys',
        method: 'POST',
        pathToRevalidate: ['/dashboard/settings/api'],
        payload: {
            totp_code: payload.totp_code,
            algorithm: payload.algorithm,
        },
    });
}

export async function getApiKeyList(): Promise<ApiResponse<ApiKeyResponseInterface[]>> {
    return await makeApiRequest<ApiKeyResponseInterface[]>({
        apiVersion: 'barong',
        endpoint: '/resource/api_keys',
    });
}

export async function deleteApiKey(payload: ApiKeyFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: `/resource/api_keys/${payload.kid}?totp_code=${payload.totp_code}`,
        method: 'DELETE',
        pathToRevalidate: ['/dashboard/settings/api'],
    });
}

export async function updateApiKey(payload: ApiKeyFormInterface): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'barong',
        endpoint: `/resource/api_keys/${payload.kid}`,
        method: 'PATCH',
        pathToRevalidate: ['/dashboard/settings/api'],
        payload: {
            totp_code: payload.totp_code,
            state: payload.state,
        },
    });
}
