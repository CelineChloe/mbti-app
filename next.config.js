/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Tăng bộ nhớ heap tối đa cho Node.js
    memoryBasedWorkersCount: true,
  },
};

module.exports = nextConfig; 