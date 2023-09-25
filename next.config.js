/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    // headers() {
    // https://report-uri.com/home/generate to solve it 
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //                 {
    //                     key: 'X-Frame-Options',
    //                     value: 'DENY',
    //                 },
    //                 {
    //                     key: 'Content-Security-Policy',
    //                     value:
    //                         `"default-src * data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' 'unsafe-dynamic'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src * data: blob: 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src * data: blob: ; style-src * data: blob: 'unsafe-inline'; font-src * data: blob: 'unsafe-inline';`,
    //                 }
    //             ],
    //         },
    //     ];
    // },
}

module.exports = nextConfig
