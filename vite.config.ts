import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'node:fs'

const isHttps = fs.existsSync('./private.key') && fs.existsSync('./certificate.pem')

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        https: isHttps ? {
            key: fs.readFileSync('./private.key'),
            cert: fs.readFileSync('./certificate.pem'),
        } : undefined
    }
})
