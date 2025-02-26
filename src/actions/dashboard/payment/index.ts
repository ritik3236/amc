'use server';

import { getCurrencyList, PageParams } from '@/actions';
import { ApiResponse, makeApiRequest } from '@/lib/api';
import {
    PaymentFormInterface,
    paymentFormSchema,
    PaymentMethodFormInterface,
    PaymentMethodInterface,
    PaymentResponseInterface,
} from '@/lib/zod';

export interface GetPaymentListParams extends PageParams {
}

export async function initializePayment(formData: PaymentFormInterface): Promise<ApiResponse<PaymentResponseInterface>> {
    const validatedFormData = paymentFormSchema.safeParse(formData);

    if (!validatedFormData.success) {
        return {
            data: null,
            error: validatedFormData.error.message,
            success: false,
        };
    }

    const payload = {
        ...validatedFormData.data,
        customer: JSON.stringify({
            email: validatedFormData.data.customer_email,
            name: validatedFormData.data.customer_name,
        }),
        description: validatedFormData.data.product_name,
    };

    return await makeApiRequest<PaymentResponseInterface>({
        apiVersion: 'peatio',
        endpoint: '/account/payment_requests',
        method: 'POST',
        payload: payload,
        purgeCache: true,
    });
}

export async function getPaymentList(payload?: GetPaymentListParams): Promise<ApiResponse<PaymentResponseInterface[]>> {
    return await makeApiRequest<PaymentResponseInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/payment_requests',
        method: 'GET',
        payload,
    });
}

export async function getPaymentInfoPrivate(payload: { id: string }): Promise<ApiResponse<PaymentResponseInterface>> {
    const response = await makeApiRequest<PaymentResponseInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/payment_requests',
        payload: { id: payload.id },
    });

    return {
        ...response,
        data: response?.data?.[0] || null,
    };
}

export async function getPaymentInfoPublic(payload: { id: string }): Promise<ApiResponse<PaymentResponseInterface>> {
    return await makeApiRequest<PaymentResponseInterface>({
        apiVersion: 'peatio',
        cache: false,
        endpoint: `/public/payment_requests/${payload.id}`,
        isPublic: true,
        method: 'GET',
    });
}

export async function getPaymentMethods(): Promise<ApiResponse<PaymentMethodInterface[]>> {
    const { success, error, data } = await getCurrencyList();

    const res = data?.map((c) => ({
        currency_icon: c.icon_url,
        currency_name: c.name,
        currency_type: c.type,
        exchange_rate: c.price,
        id: c.id,
        networks: c.networks,
        status: c.status,
    }));

    return {
        data: res || [],
        error,
        success,
    };
}

export async function setPaymentMethod(payload: PaymentMethodFormInterface): Promise<ApiResponse<PaymentResponseInterface>> {
    const payload_data = {
        ...payload,
        customer: JSON.stringify({
            name: payload.customer_name,
            email: payload.customer_email,
        }),
    };

    return await makeApiRequest<PaymentResponseInterface>({
        apiVersion: 'peatio',
        endpoint: `/public/payment_requests/${payload.payment_id}`,
        isPublic: true,
        method: 'PUT',
        pathToRevalidate: ['/pay/[id]'],
        payload: payload_data,
    });
}
