import { Icons } from '@/components/icons';

export type SiteConfig = typeof siteConfig;

export const PLATFORM_USER_CURRENCY = 'INR';
export const PLATFORM_MAIN_CURRENCY = 'USDT';
export const PLATFORM_FORMAT_STYLE = 'en-US';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'GemzPay';

const external_links = {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    discord: 'https://discord.gg/9b6yyZKmH4',
    book_a_demo: 'https://calendly.com/ritikk-muc/30min',
    docs: 'https://app.theneo.io/white-label-payment/pay/getting-started/introduction',
    api: 'https://www.postman.com/lunar-shadow-140772/domepe/collection/j7wotnn/coinfinacle',
};

export const siteConfig = {
    name: siteName,
    description: `${siteName}: A simple and secure crypto payment gateway for your business.`,
    address: 'Dubai Silicon Oasis, DDP, Building A1, Dubai, UAE',
    phone: '',
    email: `support@${siteName.split(' ').join('').toLowerCase()}.com`,
    navItems: [
        {
            label: 'Contact Us',
            href: '/contact-us',
        },
        {
            label: 'Features',
            href: '/#features',
        },
        {
            label: 'Pricing',
            href: '/pricing',
        },
        {
            label: 'Fees',
            href: '/fee',
        },
        {
            label: 'APIs',
            href: external_links.api,
            isExternal: true,
        },
        {
            label: 'Docs',
            href: external_links.docs,
            isExternal: true,
        },
    ],
    navMenuItems: [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Contact Us',
            href: '/contact-us',
        },
        {
            label: 'Login',
            href: '/login',
        },
        {
            label: 'Logout',
            href: '/logout',
        },
    ],
    dashboardSideNavItems: [
        {
            label: 'Dashboard',
            href: '/dashboard',
            target: 'User',
            parent: '/dashboard',
            exact: true,
            icon: Icons.dashboard,
        },
        {
            label: 'Balances',
            target: 'Account',
            href: '/dashboard/account',
            parent: '/dashboard/account',
            icon: Icons.wallet,
        },
        {
            label: 'Payouts',
            target: 'Withdraw',
            href: '/dashboard/withdrawals/fiat',
            parent: '/dashboard/withdrawals',
            icon: Icons.send,
        },
        {
            label: 'Deposits',
            target: 'Deposit',
            href: '/dashboard/deposits/crypto',
            parent: '/dashboard/deposits',
            icon: Icons.deposit,
        },
        {
            label: 'Bank Accounts',
            target: 'Beneficiary',
            href: '/dashboard/beneficiaries/fiat',
            parent: '/dashboard/beneficiaries/fiat',
            icon: Icons.bank,
        },
        {
            label: 'Crypto Accounts',
            target: 'Beneficiary',
            href: '/dashboard/beneficiaries/crypto',
            parent: '/dashboard/beneficiaries/crypto',
            icon: Icons.dice,
        },
        {
            label: 'Payments',
            target: 'PaymentRequest',
            href: '/dashboard/payments/list',
            parent: '/dashboard/payments/list',
            icon: Icons.qrCode,
        },
        {
            label: 'OTC Quotes',
            target: 'OtcQuote',
            href: '/dashboard/otc/quote',
            parent: '/dashboard/otc/quote',
            icon: Icons.tag,
        },
        {
            label: 'OTC Orders',
            target: 'OtcOrder',
            href: '/dashboard/otc/order',
            parent: '/dashboard/otc/order',
            icon: Icons.scroll,
        },
        {
            label: 'Settings',
            target: 'User',
            href: '/dashboard/settings/general',
            parent: '/dashboard/settings',
            icon: Icons.settings,
        },
        {
            label: 'APIs',
            target: 'User',
            href: '/dashboard/api',
            parent: '/dashboard/api',
            icon: Icons.gitMerge,
        },
    ],
    dashboardTopNavItems: [
        {
            label: 'Settings',
            href: '/dashboard/settings',
        },
        {
            label: 'Balances',
            href: '/dashboard/account',
        },
        {
            label: 'Payouts',
            href: '/dashboard/withdrawals/fiat',
        },
        {
            label: 'Pending Payments',
            href: '/dashboard/payments/links',
        },
    ],
    dashboardSettingsNavItems: [
        {
            label: 'General',
            path: '/dashboard/settings/general',
        },
        {
            label: 'Security',
            path: '/dashboard/settings/security',
        },
    ],
    dashboardPaymentNavItems: [
        {
            label: 'Payments',
            path: '/dashboard/payments/list',
        },
        {
            label: 'Active Payment Links',
            path: '/dashboard/payments/links',
        },
    ],
    dashboardBeneficiaryNavItems: [
        {
            label: 'Bank Accounts',
            path: '/dashboard/beneficiaries/fiat',
        },
        {
            label: 'Crypto Accounts',
            path: '/dashboard/beneficiaries/crypto',
        },
    ],
    dashboardWithdrawalsNavItems: [
        {
            label: 'Fiat/Bank Payouts',
            path: '/dashboard/withdrawals/fiat',
        },
        {
            label: 'Crypto Payouts',
            path: '/dashboard/withdrawals/crypto',
        },
    ],
    links: external_links,
    footerNavItems: {
        company: [
            { label: 'About', path: '/about' },
            { label: 'Terms', path: '/terms' },
            { label: 'Privacy', path: '/privacy' },
        ],
        developers: [
            { label: 'Documents', path: external_links.docs },
            { label: 'API Reference', path: external_links.api },
            { label: 'Integration Guides', path: external_links.docs },
        ],
        support: [
            { label: 'Fee', path: '/fee' },
            { label: 'Support', path: '/contact-us' },
            { label: 'Book a Demo', path: external_links.book_a_demo },
        ],
    },
};

export const contactUsOptions = {
    industry: [
        { label: 'Creator Economy Platform', value: 'creator_economy_platform' },
        { label: 'Digital Goods', value: 'digital_goods' },
        { label: 'E-Commerce / Marketplace', value: 'e_commerce_marketplace' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'HR and Payroll Services', value: 'hr_payroll_services' },
        { label: 'Import / Export', value: 'import_export' },
        { label: 'IT Solutions', value: 'it_solutions' },
        { label: 'Luxury (Fashion, Cars, Furniture...)', value: 'luxury' },
        { label: 'Payment Orchestrator', value: 'payment_orchestrator' },
        { label: 'Payment Service Provider', value: 'payment_service_provider' },
        { label: 'Professional Services', value: 'professional_services' },
        { label: 'Real Estate', value: 'real_estate' },
        { label: 'Social Media / Streaming', value: 'social_media_streaming' },
        { label: 'Trading / Exchanges', value: 'trading_exchanges' },
        { label: 'Travel & Tourism', value: 'travel_tourism' },
        { label: 'Account / Neobank / EMI', value: 'account_neobank_emi' },
        { label: 'Web3', value: 'web3' },
        { label: 'Other', value: 'other' },
    ],
};
