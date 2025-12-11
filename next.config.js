/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/random-name',
  assetPrefix: '/random-name/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig