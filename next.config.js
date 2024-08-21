/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ca.slack-edge.com',
                port: '',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'coinflow.cash',
                port: '',
                pathname: '/assets/**',
            },
        ],
    },
}

const withBundleAnalyzer =  require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig);
