import { z } from 'zod';

//password regex with at least one uppercase letter, one lowercase letter, one number, and one special character
export const passwordRegex = new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\s:])(\\S){8,32}$');
export const passwordRegexMessage = 'Password should contain at least one uppercase and lowercase letter, one number, and one special character with no spaces.';
const passwordSchema = z.string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .regex(passwordRegex, passwordRegexMessage);

export const signInSchema = z.object({
    email: z.string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z.string({ required_error: 'Password is required' })
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters'),
    otp: z.string()
        .min(0)
        .max(6, 'OTP must be 6 characters')
        .optional(),
    remember: z.union([z.boolean(), z.string()]).optional().transform((val) => {
        if (typeof val === 'string') {
            return val === 'true';
        }

        return val;
    }),
});

export const otpSchema = z.object({
    otp: z.string().trim()
        .min(6, 'OTP must be 6 characters')
        .max(6, 'OTP must be 6 characters'),
});

export type OtpSchema = z.infer<typeof otpSchema>;

export const signUpSchema = z.object({
    email: z.string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: passwordSchema,
    confirm_password: z.string({ required_error: 'Confirm password is required' })
        .min(1, 'Confirm password is required'),
    terms: z.union([z.boolean(), z.string()]).transform((val) => {
        if (typeof val === 'string') {
            return val === 'true';
        }

        return val;
    }),
}).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
}).refine((data) => data.terms === true, {
    path: ['terms'],
    message: 'You must accept the terms and conditions',
});

export const forgotPasswordSchema = z.object({
    new_password: passwordSchema,
    confirm_password: z.string({ required_error: 'Confirm password is required' })
        .min(1, 'Confirm password is required'),
    reset_token: z.string({ required_error: 'Reset token is required' }),
}).refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
});

export const userPreferenceFormSchema = z.object({
    format_style: z.string({ required_error: 'Format style is required' }),
    main_currency: z.string({ required_error: 'Main currency is required' }),
});

export const userPreferenceSchema = z.object({
    format_style: z.string(),
    language: z.string(),
    main_currency: z.string(),
    timezone: z.string(),
});

export const contactUsFormSchema = z.object({
    first_name: z.string({ required_error: 'First name is required' })
        .min(1, 'First name is required')
        .max(50, 'First name must be less than 50 characters'),
    last_name: z.string({ required_error: 'Last name is required' })
        .min(1, 'Last name is required')
        .max(50, 'Last name must be less than 50 characters'),
    email: z.string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    phone_code: z.string({ required_error: 'Phone code is required' })
        .min(1, 'Phone code is required')
        .max(5, 'Invalid phone code'),
    phone_number: z.string({ required_error: 'Phone number is required' })
        .min(8, 'Phone number is required')
        .max(15, 'Phone number must be less than 15 characters')
        .regex(/^[0-9]+$/, 'Invalid phone number'),
    company_name: z.string({ required_error: 'Company name is required' })
        .min(1, 'Company name is required')
        .max(50, 'Company name must be less than 50 characters'),
    industry: z.array(z.string())
        .min(1, 'Industry is required'),
    message: z.string({ required_error: 'Message is required' })
        .min(1, 'Message is required')
        .max(500, 'Message must be less than 500 characters'),
    website_url: z.string().optional(),
});

export const labelSchema = z.object({
    key: z.string(),
    value: z.string(),
    scope: z.string(),
});

export const phoneSchema = z.object({
    country: z.string(),
    created_at: z.coerce.date(),
    id: z.number(),
    number: z.string(),
    updated_at: z.coerce.date(),
    validated_at: z.date().nullable(),
});

export const profileSchema = z.object({
    address: z.string(),
    city: z.string(),
    country: z.string(),
    created_at: z.coerce.date(),
    dob: z.coerce.date(),
    first_name: z.string(),
    full_name: z.string(),
    id: z.number(),
    last_name: z.string(),
    postcode: z.string(),
    state: z.string(),
    updated_at: z.coerce.date(),
});

export const userSchema = z.object({
    created_at: z.coerce.date(),
    csrf_token: z.string().optional(),
    data: z.string(),
    data_storages: z.array(z.any()),
    email: z.string().email(),
    labels: z.array(labelSchema),
    level: z.number(),
    otp: z.boolean(),
    phones: z.array(phoneSchema),
    profiles: z.array(profileSchema),
    referral_uid: z.string().nullable(),
    role: z.string(),
    state: z.string(),
    uid: z.string(),
    updated_at: z.coerce.date(),
    username: z.string().nullable(),

    access_token: z.object({
        value: z.string(),
        name: z.string(),
        expires_at: z.coerce.date(),
    }).optional(),
});

export const twoFactorAuthFormSchema = z.object({
    code: z.string({ required_error: 'Code is required' })
        .min(1, 'Code is required')
        .max(6, 'Code must be less than 6 characters'),
    status: z.enum(['enable', 'disable']),
}).refine((data) => data.code.length === 6, {
    path: ['code'],
    message: 'Code must be 6 characters',
});

export const twoFactorAuthResponseSchema = z.object({
    data: z.object({
        barcode: z.string(),
        url: z.string(),
    }),
});

export const passwordUpdateFormSchema = z.object({
    old_password: z.string({ required_error: 'Current password is required' })
        .min(1, 'Current password is required'),
    new_password: z.string({ required_error: 'New password is required' })
        .min(1, 'New password is required'),
    confirm_password: z.string({ required_error: 'Confirm password is required' })
        .min(1, 'Confirm password is required'),
}).refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
});

export const paymentFormSchema = z.object({
    product_name: z.string({ required_error: 'Product name is required' })
        .min(1, 'Product name is required')
        .max(64, 'Product name must be less than 64 characters'),
    reference_id: z.string({ required_error: 'Order id is required' })
        .min(8, 'Order id should be at least 8 characters')
        .max(64, 'Order id must be less than 64 characters'),
    req_amount: z.coerce
        .number({ required_error: 'Request amount is required' })
        .gt(0, 'Request amount must be greater than 0'),
    req_currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    customer_name: z.string().optional(),
    customer_email: z.string().optional(),
    redirect_url: z.string().optional(),
});

export const paymentMethodFormSchema = z.object({
    payment_id: z.string({ required_error: 'Payment method is required' })
        .min(1, 'Payment method is required'),
    pay_currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    pay_blockchain: z.string({ required_error: 'Network is required' })
        .min(1, 'Network is required'),
    customer_name: z.string().optional(),
    customer_email: z.string().email({ message: 'Invalid email' }),
});

export const depositFormSchema = z.object({
    currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    network: z.string({ required_error: 'Network is required' })
        .min(1, 'Network is required'),
});

export const depositSchema = z.object({
    address: z.string(),
    amount: z.string(),
    blockchain_key: z.string(),
    completed_at: z.coerce.date().nullable(),
    confirmations: z.number(),
    created_at: z.coerce.date(),
    currency: z.string(),
    explorer_address: z.string(),
    explorer_transaction: z.string(),
    fee: z.string(),
    id: z.number(),
    protocol: z.string(),
    state: z.string(),
    tid: z.string(),
    txid: z.string().nullable(),
    type: z.string(),
});

export const depositAddressSchema = z.object({
    address: z.string(),
    blockchain_key: z.string(),
    created_at: z.coerce.date(),
    currencies: z.array(z.string()),
    explorer_address: z.string(),
    id: z.number(),
    protocol: z.string(),
    state: z.string(),
    status: z.string(),
    updated_at: z.coerce.date(),
});

const paymentCustomerSchema = z.object({
    address: z.string().nullable(),
    email: z.string(),
    id: z.number(),
    name: z.string(),
    phone: z.string().nullable(),
});

export const paymentResponseSchema = z.object({
    address: z.string().nullable(),
    customer: paymentCustomerSchema,
    deposits: z.array(depositSchema).nullable(),
    description: z.string().nullable(),
    exchange_rate: z.string().nullable(),
    expired_at: z.coerce.date().nullable(),
    id: z.string(),
    initiated_at: z.coerce.date().nullable(),
    org_name: z.string(),
    pay_amount: z.string().nullable(),
    pay_blockchain: z.string().nullable(),
    pay_currency: z.string().nullable(),
    pay_protocol: z.string().nullable(),
    received_amount: z.string().nullable(),
    redirect_url: z.string().nullable(),
    reference_id: z.string(),
    remaining_amount: z.string().nullable(),
    req_amount: z.string(),
    req_currency: z.string(),
    state: z.string(),
    tag: z.array(z.string()),
    txid: z.string().nullable(),
});

export const accountResponseInterface = z.object({
    balance: z.string(),
    currency: z.string(),
    escrow: z.string(),
    locked: z.string(),
    wallet_type: z.string(),
});

// ---- Bank and Crypto Accounts ----

export const bankAccountSchema = z.object({
    account_holder_name: z.string(),
    account_number: z.string(),
    bank_code: z.string(),
    created_at: z.coerce.date(),
    currency_id: z.string(),
    currency_network_id: z.string(),
    id: z.string(),
    label: z.string(),
    status: z.string(),
});

export const cryptoAccountSchema = z.object({
    address: z.string(),
    created_at: z.coerce.date(),
    currency_id: z.string(),
    currency_network_id: z.string(),
    explorer_address: z.string().nullable(),
    id: z.string(),
    label: z.string(),
    protocol: z.string(),
    status: z.string(),
});

export const bankAccountFormSchema = z.object({
    currency_id: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    bank_code: z.string({ required_error: 'Bank code is required' })
        .min(1, 'Bank code is required'),
    account_number: z.string({ required_error: 'Account number is required' })
        .min(5, 'Account number must be at least 5 characters')
        .max(30, 'Account number must be less than 30 characters'),
    account_holder_name: z.string({ required_error: 'Account holder name is required' })
        .min(5, 'Account holder name must be at least 5 characters')
        .max(50, 'Account holder must be less than 50 characters'),
    label: z.string({ required_error: 'Nickname is required' })
        .min(3, 'Nickname must be at least 3 characters')
        .max(30, 'Nickname must be less than 30 characters'),
});

export const cryptoAccountFormSchema = z.object({
    currency_id: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    currency_network_id: z.string({ required_error: 'Network is required' })
        .min(1, 'Network is required'),
    address: z.string({ required_error: 'Address is required' })
        .min(1, 'Address is required'),
    label: z.string({ required_error: 'Nickname is required' })
        .min(3, 'Nickname must be at least 3 characters')
        .max(30, 'Nickname must be less than 30 characters'),
});

export type BankAccountFormInterface = z.infer<typeof bankAccountFormSchema>;
export type BankAccountInterface = z.infer<typeof bankAccountSchema>;

export type CryptoAccountFormInterface = z.infer<typeof cryptoAccountFormSchema>;
export type CryptoAccountInterface = z.infer<typeof cryptoAccountSchema>;

// ---- beneficiaries form ------

export const beneficiaryCryptoFormSchema = z.object({
    name: z.string({ required_error: 'Name is required' })
        .min(1, 'Nickname is required')
        .max(30, 'Nickname must be less than 30 characters'),
    currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    address: z.string({ required_error: 'Address is required' })
        .min(1, 'Address is required'),
    network: z.string({ required_error: 'Network is required' })
        .min(1, 'Network is required'),
    description: z.string().optional(),
});

export const beneficiaryFiatFormSchema = z.object({
    currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    blockchain_key: z.string({ required_error: 'Blockchain key is required' }),
    nick_name: z.string({ required_error: 'Nickname is required' })
        .min(5, 'Nickname must be at least 5 characters')
        .max(30, 'Nickname must be less than 30 characters'),
    full_name: z.string({ required_error: 'Account holder name is required' })
        .min(5, 'Account holder name must be at least 5 characters')
        .max(50, 'Account holder must be less than 50 characters'),
    account_type: z.string({ required_error: 'Account type is required' })
        .min(1, 'Account type is required'),
    account_number: z.string({ required_error: 'Account number is required' })
        .min(1, 'Account number is required')
        .max(30, 'Account number must be less than 30 characters'),
    bank_ifsc_code: z.string({ required_error: 'Bank IFSC code is required' })
        .min(1, 'Bank IFSC code is required')
        .max(15, 'Bank IFSC code must be less than 15 characters'),
});

export const beneficiaryActivationFromSchema = z.object({
    id: z.string({ required_error: 'Id is required' })
        .min(1, 'Id is required')
        .max(30, 'Id must be less than 30 characters'),
    pin: z.string({ required_error: 'Otp is required' })
        .min(1, 'Otp is required')
        .max(6, 'Otp must be less than 6 characters'),
}).refine((data) => data.pin.length === 6, {
    message: 'Otp must be 6 characters',
    path: ['pin'],
});

export const beneficiarySchema = z.object({
    blockchain_key: z.string(),
    created_at: z.coerce.date(),
    currency: z.string(),
    description: z.string(),
    explorer_address: z.string(),
    id: z.string(),
    name: z.string(),
    protocol: z.string(),
    state: z.string(),
    type: z.enum(['crypto', 'fiat']),

    data: z.object({
        account_number: z.string(),
        account_type: z.string(),
        address: z.string(),
        bank_ifsc_code: z.string(),
        full_name: z.string(),
    }),
});

export const withdrawalFormSchema = z.object({
    currency: z.string({ required_error: 'Currency is required' })
        .min(1, 'Currency is required'),
    amount: z.string({ required_error: 'Amount is required' })
        .min(1, 'Amount is required'),
    otp: z.string()
        .min(1, 'OTP is required')
        .max(6, 'OTP must be 6 characters'),
    network: z.string({ required_error: 'Network is required' })
        .min(1, 'Network is required'),
    beneficiary_id: z.string({ required_error: 'Beneficiary is required' })
        .min(1, 'Beneficiary is required'),
    note: z.string().optional(),
}).refine((data) => +data.amount > 0, {
    message: 'Amount must be greater than 0',
    path: ['amount'],
}).refine((data) => data.otp.length === 6, {
    message: 'OTP must be 6 characters',
    path: ['otp'],
});

export const withdrawalSchema = z.object({
    amount: z.string(),
    blockchain_key: z.string(),
    client_reference_id: z.string(),
    completed_at: z.coerce.date().nullable(),
    confirmations: z.number(),
    created_at: z.coerce.date(),
    currency: z.string(),
    explorer_address: z.string(),
    explorer_transaction: z.string(),
    fee: z.string(),
    id: z.number(),
    note: z.string(),
    protocol: z.string(),
    rid: z.string(),
    state: z.string(),
    tid: z.string(),
    txid: z.string().nullable(),
    type: z.string(),
    updated_at: z.coerce.date().nullable(),
});

export const networkSchema = z.object({
    base_factor: z.number(),
    blockchain_key: z.string(),
    currency_id: z.string(),
    deposit_enabled: z.boolean(),
    deposit_fee: z.string(),
    description: z.string(),
    explorer_address: z.string(),
    explorer_transaction: z.string(),
    id: z.string(),
    min_confirmations: z.number(),
    min_deposit_amount: z.string(),
    min_withdraw_amount: z.string(),
    protocol: z.string(),
    status: z.string(),
    withdraw_fee: z.string(),
    withdrawal_enabled: z.boolean(),
});

export const currencySchema = z.object({
    icon_url: z.string(),
    id: z.string(),
    name: z.string(),
    networks: z.array(networkSchema),
    precision: z.number(),
    price: z.string(),
    status: z.string(),
    type: z.string(),
});

export const marketSchema = z.object({
    amount_precision: z.number(),
    base_unit: z.string(),
    filters: z.array(z.object({})),
    id: z.string(),
    max_price: z.string(),
    min_amount: z.string(),
    min_price: z.string(),
    name: z.string(),
    p2p_state: z.string(),
    position: z.number(),
    price_precision: z.number(),
    quote_unit: z.string(),
    state: z.string(),
});

export const paymentMethodSchema = z.object({
    currency_icon: z.string(),
    currency_name: z.string(),
    currency_type: z.string(),
    exchange_rate: z.string(),
    id: z.string(),
    networks: z.array(networkSchema),
    status: z.string(),
});

export const apiKeyFormSchema = z.object({
    kid: z.string().optional(),
    totp_code: z.string()
        .min(1, 'OTP must be 6 characters')
        .max(6, 'OTP must be 6 characters'),
    algorithm: z.string().optional(),
    state: z.string().optional(),
});

export const apiKeyResponseSchema = z.object({
    algorithm: z.string(),
    created_at: z.coerce.date(),
    kid: z.string(),
    scope: z.array(z.string()),
    secret: z.string(),
    state: z.string(),
    updated_at: z.coerce.date(),
});

export const otcQuoteFormSchema = z.object({
    market: z.string({ required_error: 'Market is required' })
        .min(1, 'Market is required'),
    req_amount: z.coerce
        .number({ required_error: 'Request amount is required' })
        .gt(0, 'Request amount must be greater than 0'),
    side: z.string({ required_error: 'Side is required' })
        .min(1, 'Side is required'),
});

export const otcOrderFormSchema = z.object({
    market: z.string({ required_error: 'Market is required' })
        .min(1, 'Market is required'),
    amount: z.coerce
        .number({ required_error: 'Request amount is required' })
        .gt(0, 'Request amount must be greater than 0'),
    side: z.string({ required_error: 'Side is required' })
        .min(1, 'Side is required'),
});

export const otcOrderSchema = z.object({
    amount: z.string(),
    client_reference_id: z.string(),
    created_at: z.coerce.date(),
    fee: z.string(),
    fee_currency: z.string(),
    market: z.string(),
    order_id: z.number(),
    order_status: z.string(),
    price: z.string(),
    side: z.string(),
    tax: z.string(),
    tax_currency: z.string(),
});

export const otcQuoteSchema = z.object({
    allotted_amount: z.string(),
    avg_price: z.string(),
    created_at: z.coerce.date(),
    expired_at: z.coerce.date(),
    market: z.string(),
    otc_orders: z.array(otcOrderSchema),
    quote_id: z.number(),
    quote_status: z.string(),
    req_amount: z.string(),
    side: z.string(),
});

/**
 * Analytics Interface
 * */

export const analyticsSchema = z.object({
    today_payments: z.record(z.string()).optional(),
    previous_payments: z.record(z.string()).optional(),
    total_withdrawals: z.record(z.string()).optional(),
});

export type AnalyticsInterface = z.infer<typeof analyticsSchema>;
// =================================================================

export type AccountResponseInterface = z.infer<typeof accountResponseInterface>;
export type ApiKeyFormInterface = z.infer<typeof apiKeyFormSchema>;
export type ApiKeyResponseInterface = z.infer<typeof apiKeyResponseSchema>;
export type BeneficiaryActivationFormInterface = z.infer<typeof beneficiaryActivationFromSchema>;
export type BeneficiaryFormCryptoInterface = z.infer<typeof beneficiaryCryptoFormSchema>;
export type BeneficiaryFormFiatInterface = z.infer<typeof beneficiaryFiatFormSchema>;
export type BeneficiaryInterface = z.infer<typeof beneficiarySchema>;
export type ContactUsFormInterface = z.infer<typeof contactUsFormSchema>;
export type CurrencyInterface = z.infer<typeof currencySchema>;
export type DepositAddressInterface = z.infer<typeof depositAddressSchema>;
export type DepositInterface = z.infer<typeof depositSchema>;
export type DepositFormInterface = z.infer<typeof depositFormSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type LabelInterface = z.infer<typeof labelSchema>;
export type MarketInterface = z.infer<typeof marketSchema>;
export type NetworkInterface = z.infer<typeof networkSchema>;
export type OtcOrderFormInterface = z.infer<typeof otcOrderFormSchema>;
export type OtcOrderInterface = z.infer<typeof otcOrderSchema>;
export type OtcQuoteFormInterface = z.infer<typeof otcQuoteFormSchema>;
export type OtcQuoteInterface = z.infer<typeof otcQuoteSchema>;
export type PasswordUpdateFormInterface = z.infer<typeof passwordUpdateFormSchema>;
export type PaymentFormInterface = z.infer<typeof paymentFormSchema>;
export type PaymentMethodFormInterface = z.infer<typeof paymentMethodFormSchema>;
export type PaymentMethodInterface = z.infer<typeof paymentMethodSchema>;
export type PaymentResponseInterface = z.infer<typeof paymentResponseSchema>;
export type PhoneInterface = z.infer<typeof phoneSchema>;
export type ProfileInterface = z.infer<typeof profileSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
export type TwoFactorAuthFormInterface = z.infer<typeof twoFactorAuthFormSchema>;
export type TwoFactorAuthResponseInterface = z.infer<typeof twoFactorAuthResponseSchema>;
export type UserInterface = z.infer<typeof userSchema>;
export type WithdrawalFormInterface = z.infer<typeof withdrawalFormSchema>;
export type WithdrawalInterface = z.infer<typeof withdrawalSchema>;
export type UserPreferenceFormInterface = z.infer<typeof userPreferenceFormSchema>;
export type UserPreferenceInterface = z.infer<typeof userPreferenceSchema>;
