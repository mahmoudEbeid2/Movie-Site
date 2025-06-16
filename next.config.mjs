/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['image.tmdb.org'], // Allow images from TMDB
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/**',
          },
        ],
      },
  } 
export default nextConfig