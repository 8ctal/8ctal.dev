import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
  tailwindcss(),
  ],
  // Temporary, for testing over a cloudflared quick tunnel: Vite rejects
  // requests whose Host header it doesn't recognize (DNS-rebinding
  // protection), and the tunnel's *.trycloudflare.com hostname isn't one
  // of those by default. Revert this once tunnel testing is done.
  server: {
    allowedHosts: true,
  },
})
