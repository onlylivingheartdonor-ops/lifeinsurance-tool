/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'lifeinsurancecoveragecalculator.com' }],
        destination: 'https://www.lifeinsurancecoveragecalculator.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig