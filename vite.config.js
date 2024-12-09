import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Répertoire de sortie pour les fichiers statiques
    },
    server: {
        port: 3000,
        historyApiFallback: true, // Utilisé pour le développement
    },
})
