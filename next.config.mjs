/** @type {import('next').NextConfig} */
const nextConfig = {
    // 데이터 로깅
    logging: {
        fetches: {
            fullUrl:true,
        }
    }
};

export default nextConfig;
