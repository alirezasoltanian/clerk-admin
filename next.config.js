/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.uritect.top',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.uritect.topteachers',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
