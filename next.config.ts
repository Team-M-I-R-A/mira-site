import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.6','unseparately-nonrelational-uriel.ngrok-free.dev',],
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
