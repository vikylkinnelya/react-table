/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    API_KEY: 'zdavz3FRgvOMSBoCSgmLnr6VXK1MPo0W'
  },
  images: {
    domains: ['static01.nyt.com'],
    imageSizes: [440]
  }
}
