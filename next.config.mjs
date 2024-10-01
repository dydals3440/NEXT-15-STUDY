/** @type {import('next').NextConfig} */
const nextConfig = {
    // 데이터 로깅
    logging: {
        fetches: {
            fullUrl:true,
        }
    },
    images: {
        domains: [
            'shopping-phinf.pstatic.net'
        ]
    }
};

export default nextConfig;
