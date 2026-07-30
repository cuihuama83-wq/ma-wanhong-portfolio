import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative assets let the portfolio work from either a custom domain or a
// project-scoped GitHub Pages URL.
export default defineConfig({
  base: './',
  publicDir: 'site-public',
  plugins: [react()],
})
