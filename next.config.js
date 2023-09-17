/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value:
                            `default-src 'unsafe-inline' 'unsafe-eval' * ; worker-src 'self' blob: ${process.env.WEBSITE_URL}`,
                    }
                ],
            },
        ];
    },
}

module.exports = nextConfig
