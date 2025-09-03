import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    server: {
        // host: true,       // Expose the server to your network
        host: '0.0.0.0',
        port: 5173,       // Default Vite port, you can change if needed
        // origin: 'http://10.7.52.176:5173',  // Explicitly set the origin
        watch: {
            usePolling: true, // Helps with file watching inside Docker
        },
        hmr: {
            host: 'localhost',
        },

    },

});
