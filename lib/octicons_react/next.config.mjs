/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@primer/components'],
  pageExtensions: ['js', 'jsx', 'mjs', 'ts', 'tsx'],
}

export default nextConfig
