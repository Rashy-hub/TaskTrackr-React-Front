import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Répertoire de sortie
    },
    server: {
        historyApiFallback: true, // Assure le fallback pour les routes
        port: 3000,
    },
})
