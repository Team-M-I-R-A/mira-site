import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.6','192.168.1.88'],
  turbopack: {
    root: process.cwd(),
  },
  // Le chatbot lit les politiques depuis /policies à l'exécution :
  // on les inclut dans le bundle de la route API.
  outputFileTracingIncludes: {
    '/api/chat': ['./policies/**/*'],
  },
}

export default nextConfig
