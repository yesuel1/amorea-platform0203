/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 이 부분을 추가해야 배포용 'out' 폴더가 생깁니다.
  images: {
    unoptimized: true, // 정적 배포 시 이미지 오류 방지
  },
};

export default nextConfig;
