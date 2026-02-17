import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// For project Pages (e.g. username.github.io/Valentines_day/), set base: '/Valentines_day/'
export default defineConfig({
  base: '/', // Root for user Pages (username.github.io)
  plugins: [react()],
})
