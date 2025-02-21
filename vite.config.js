import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@composables': path.resolve(__dirname, './src/composables'),
			'@stores': path.resolve(__dirname, './src/stores'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@services': path.resolve(__dirname, './src/services'),
			crypto: "crypto-browserify",
		},
	},

	plugins: [vue()],
})

