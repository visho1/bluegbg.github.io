import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Ta bort Netlify-importen helt eftersom vi lämnar Netlify!

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(), 
    tanstackStart({
      // Detta tvingar TanStack Start att generera statiska HTML-filer istället för en server-app
      deploymentTarget: 'static' 
    }), 
    viteReact()
  ],
  // Byt ut till '/' om ditt arkiv heter exakt "bluegbg.github.io"
  // Byt till '/arkiv-namn/' om arkivet heter något annat
  base: '/' 
})

export default config
