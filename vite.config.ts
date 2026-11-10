import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(), 
    tanstackStart({
      prerender: {
        enabled: true // Tvingar TanStack att för-rendera statiska HTML-sidor
      }
    }), 
    viteReact()
  ],
  // Måste matcha den exakta undermappen på GitHub Pages!
  base: '/bluegbg.github.io/' 
})

export default config
