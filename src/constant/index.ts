import { Icons } from '@/components/icons';

const services = {
    'global': {
        key: 'global',
        tabIcon: Icons.globe,
        tabTitle: 'Global acceptance',
        contentIcon: Icons.globe,
        contentTitle: 'Global card acceptance',
        contentDesc: 'Open your business to the world. Sell digital goods and services seamlessly with 1 click checkout. Tap into the most popular payment methods, empowering your business to drive revenue instantly and securely, wherever your customers are.',
    },
    'currency': {
        key: 'currency',
        tabIcon: Icons.coins,
        tabTitle: '100+ crypto supported',
        contentIcon: Icons.coins,
        contentTitle: '100+ crypto currency supported',
        contentDesc: 'Merchants can process fast and errorless crypto transactions in top currencies supported by CoinDhanPay. They are widely accepted and are consistently being improved..',
    },
    'unlimited': {
        key: 'unlimited',
        tabIcon: Icons.infinity,
        tabTitle: 'No limits',
        contentIcon: Icons.infinity,
        contentTitle: 'No limits on transactions',
        contentDesc: 'Any amount may be transferred in accordance with your requirements. There are no restrictions in terms of upper-limits.',
    },
    'settlement': {
        key: 'settlement',
        tabIcon: Icons.zap,
        tabTitle: 'Instant settlement',
        contentIcon: Icons.zap,
        contentTitle: 'Instant settlement',
        contentDesc: 'Instant settlement. Get paid instantly and settle your funds in your preferred crypto currency. no more waiting for your funds to be settled like traditional payment gateways.',
    },
    'integration': {
        key: 'integration',
        tabIcon: Icons.gitMerge,
        tabTitle: 'Easy integration',
        contentIcon: Icons.gitMerge,
        contentTitle: 'Easy integration on any platform',
        contentDesc: 'Integrate our API & widget with your platform in minutes. No more hassle of setting up a payment gateway. Our API/Widget is easy to use and integrate with your platform.',
    },
    'dashboard': {
        key: 'dashboard',
        tabIcon: Icons.dashboard,
        tabTitle: 'Dashboard',
        contentIcon: Icons.dashboard,
        contentTitle: 'Initiative dashboard',
        contentDesc: 'Track your transactions, view your dashboard, and manage your account with ease. Our dashboard is designed to make your life easier. make withdrawals, deposits, and more.',
    },
};

export const pageConstants = {
    landing: { services },
};