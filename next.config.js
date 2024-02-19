/** @type {import('next').NextConfig} */

// hacky fix for node canvas module issue
// - https://github.com/Automattic/node-canvas/issues/1779#issuecomment-895885846
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}


const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "*.app.github.dev", "*.vercel.app" ,'buildyourresume.online'],
        },
    },
    // serverActions: true,
    reactStrictMode: true,
    compress: true,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    // https://report-uri.com/home/generate to solve it 
    // headers() {
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
    //                     value: "default-src 'self'; script-src 'report-sample' 'self' ; style-src 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self'; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; report-uri https://65b6adae73eb9d58ab9f74e1.endpoint.csper.io/?v=0; worker-src 'none';"
    //                         // `Content-Security-Policy: default-src 'self' data:; script-src 'self' data:; style-src 'self'; img-src *; media-src *; object-src *`,
    //                         // "Content-Security-Policy: default-src 'self' data:; script-src * 'self' data: 'unsafe-inline' 'unsafe-hashes' 'unsafe-eval'; style-src 'self'; img-src *; media-src *; object-src *"
    //                         // `"default-src * data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' 'unsafe-dynamic'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src * data: blob: 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src * data: blob: ; style-src * data: blob: 'unsafe-inline'; font-src * data: blob: 'unsafe-inline';`,
    //                 }
    //             ],
    //         },
    //     ];
    // },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({ enabled: true });
eval(process.env.ANALYZE) && console.log("\tIn site sizeView :", eval(process.env.ANALYZE));

module.exports = eval(process.env.ANALYZE) ? withBundleAnalyzer({}) : nextConfig;
