'use server';

import { ApiResponse, makeApiRequest } from '@/lib/api';
import {
    AccountResponseInterface,
    BankAccountFormInterface,
    BankAccountInterface,
    BeneficiaryActivationFormInterface,
    BeneficiaryFormCryptoInterface,
    BeneficiaryFormFiatInterface,
    BeneficiaryInterface,
    CryptoAccountFormInterface,
    CryptoAccountInterface,
    DepositAddressInterface,
    DepositFormInterface,
    DepositInterface,
    WithdrawalFormInterface,
    WithdrawalInterface,
} from '@/lib/zod';

export interface PageParams {
    limit?: number;
    page?: number;
}

export interface GetWithdrawalListParams extends PageParams {
    type?: 'Withdraws::Fiat' | 'Withdraws::Coin';
    beneficiary_id?: string;
    tid?: string;
    client_reference_id?: string;
}

export interface GetDepositListParams {
    type?: string;
    beneficiary_id?: string;
}

type GetBeneficiaryListParams = {
    id?: string;
    currency_id?: string;
    account_number?: string;
    blockchain_key?: string;
};

type UpdateBeneficiaryParams = {
    id: string;
    state: 'enable' | 'disable' | 'activate';
    otp_code: string;
};

type DeleteBeneficiaryParams = {
    id: string;
    otp_code: string;
};

export async function getAccountList(): Promise<ApiResponse<AccountResponseInterface[]>> {
    const { success, data, error, headers } = await makeApiRequest<AccountResponseInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/balances',
    });

    const filteredData = data?.filter((w) => w.wallet_type === 'spot');

    return { data: filteredData, error, headers, success };
}

// #===================== BANK ACCOUNTS ====================#

export async function createBankAccount(payload: BankAccountFormInterface): Promise<ApiResponse<BankAccountInterface>> {
    return await makeApiRequest<BankAccountInterface>({
        apiVersion: 'peatio',
        endpoint: '/account/bank_accounts',
        method: 'POST',
        payload,
        purgeCache: true,
    });
}

export async function getBankAccountList(payload?: GetBeneficiaryListParams): Promise<ApiResponse<BankAccountInterface[]>> {
    return await makeApiRequest<BankAccountInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/bank_accounts',
        payload,
    });
}

export async function getBankAccountById(payload: { id: string }): Promise<ApiResponse<BankAccountInterface>> {
    const response = await makeApiRequest<BankAccountInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/bank_accounts',
        payload,
    });

    return { ...response, data: response?.data?.[0] || null };
}

export async function updateBankAccount(payload: UpdateBeneficiaryParams): Promise<ApiResponse<BankAccountInterface>> {
    return await makeApiRequest<BankAccountInterface>({
        apiVersion: 'peatio',
        endpoint: `/account/bank_accounts/${payload.id}/${payload.state}`,
        method: 'PATCH',
        payload: {
            otp_code: payload.otp_code,
        },
        purgeCache: true,
    });
}

export async function deleteBankAccount(payload: DeleteBeneficiaryParams): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: `/account/bank_accounts/${payload.id}`,
        method: 'DELETE',
        payload: {
            otp_code: payload.otp_code,
        },
        purgeCache: true,
    });
}

// #===================== CRYPTO ACCOUNTS ====================#

export async function createCryptoAccount(payload: CryptoAccountFormInterface): Promise<ApiResponse<CryptoAccountInterface>> {
    return await makeApiRequest<CryptoAccountInterface>({
        apiVersion: 'peatio',
        endpoint: '/account/withdraw_addresses',
        method: 'POST',
        payload,
        purgeCache: true,
    });
}

export async function getCryptoAccountList(payload?: GetBeneficiaryListParams): Promise<ApiResponse<CryptoAccountInterface[]>> {
    return await makeApiRequest<CryptoAccountInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/withdraw_addresses',
        payload,
    });
}

export async function getCryptoAccountById(payload: { id: string }): Promise<ApiResponse<CryptoAccountInterface>> {
    const response = await makeApiRequest<CryptoAccountInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/withdraw_addresses',
        payload,
    });

    return { ...response, data: response?.data?.[0] || null };
}

export async function updateCryptoAccount(payload: UpdateBeneficiaryParams): Promise<ApiResponse<CryptoAccountInterface>> {
    return await makeApiRequest<CryptoAccountInterface>({
        apiVersion: 'peatio',
        endpoint: `/account/withdraw_addresses/${payload.id}/${payload.state}`,
        method: 'PATCH',
        payload: {
            otp_code: payload.otp_code,
        },
        purgeCache: true,
    });
}

export async function deleteCryptoAccount(payload: DeleteBeneficiaryParams): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: `/account/withdraw_addresses/${payload.id}`,
        method: 'DELETE',
        payload: {
            otp_code: payload.otp_code,
        },
        purgeCache: true,
    });
}

// #===================== OLD BENEFICIARIES ====================#

export async function getBeneficiaryList(payload?: GetBeneficiaryListParams): Promise<ApiResponse<BeneficiaryInterface[]>> {
    return await makeApiRequest<BeneficiaryInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/beneficiaries',
        payload,
    });
}

export async function getBeneficiaryById(payload: { id: string }): Promise<ApiResponse<BeneficiaryInterface>> {
    const response = await makeApiRequest<BeneficiaryInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/beneficiaries',
        payload,
    });

    return { ...response, data: response?.data?.[0] || null };
}

export async function addNewCryptoBeneficiary(formData: BeneficiaryFormCryptoInterface): Promise<ApiResponse<BeneficiaryInterface[]>> {
    const payload = {
        ...formData,

        // TODO: remove after migration
        blockchain_key: formData.network,
        data: JSON.stringify({ address: formData.address }),
    };

    return await makeApiRequest<BeneficiaryInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/beneficiaries',
        method: 'POST',
        payload: payload,
        purgeCache: true,
    });
}

export async function addNewFiatBeneficiary(formData: BeneficiaryFormFiatInterface): Promise<ApiResponse<BeneficiaryInterface[]>> {
    const payload = {
        blockchain_key: formData.blockchain_key,
        currency: formData.currency,
        data: JSON.stringify({
            account_number: formData.account_number.trim(),
            account_type: formData.account_type.trim(),
            bank_ifsc_code: formData.bank_ifsc_code.toUpperCase().trim(),
            full_name: formData.full_name.trim().slice(0, 35),
            nick_name: formData.nick_name.trim(),
        }),
        name: formData.nick_name,
    };

    return await makeApiRequest<BeneficiaryInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/beneficiaries',
        method: 'POST',
        payload: payload,
        purgeCache: true,
    });
}

export async function activateBeneficiary(formData: BeneficiaryActivationFormInterface): Promise<ApiResponse<BeneficiaryInterface[]>> {
    return await makeApiRequest<BeneficiaryInterface[]>({
        apiVersion: 'peatio',
        endpoint: `/account/beneficiaries/${formData.id}/activate`,
        method: 'PATCH',
        payload: formData,
        purgeCache: true,
    });
}

export async function resendBeneficiaryActivation(payload: { id: string }): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: `/account/beneficiaries/${payload.id}/resend_pin`,
        method: 'PATCH',
    });
}

export async function deleteBeneficiary(payload: { id: string }): Promise<ApiResponse> {
    return await makeApiRequest({
        apiVersion: 'peatio',
        endpoint: `/account/beneficiaries/${payload.id}`,
        method: 'DELETE',
        purgeCache: true,
    });
}

// #===================== WITHDRAWALS ====================#

export async function doWithdrawal(payload: WithdrawalFormInterface): Promise<ApiResponse<WithdrawalInterface>> {
    return await makeApiRequest<WithdrawalInterface>({
        apiVersion: 'peatio',
        endpoint: '/account/withdraws',
        method: 'POST',
        payload: payload,
        purgeCache: true,
    });
}

export async function getWithdrawalList(payload?: GetWithdrawalListParams): Promise<ApiResponse<WithdrawalInterface[]>> {
    return await makeApiRequest<WithdrawalInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/withdraws',
        payload,
    });
}

// #===================== DEPOSITS ====================#

export async function getDepositList(payload?: GetDepositListParams): Promise<ApiResponse<DepositInterface[]>> {
    return await makeApiRequest<DepositInterface[]>({
        apiVersion: 'peatio',
        endpoint: '/account/deposits',
        payload,
    });
}

export async function getDepositAddress(payload: DepositFormInterface): Promise<ApiResponse<DepositAddressInterface>> {
    return await makeApiRequest<DepositAddressInterface>({
        apiVersion: 'peatio',
        endpoint: `/account/deposit_address/${payload.currency}`,
        method: 'GET',
        payload: { blockchain_key: payload.network },
    });
}
