import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),

    // VitePWA({
    //   manifest: {
    //     name: 'EWUCCC',
    //     short_name: 'EWUCCC',
    //     icons: [
    //       {
    //         src: '/icons/ewu_icon192.png',
    //         sizes: '192x192',
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/ewu_512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/android-icon-48x48.png",
    //         sizes: "48x48",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/apple-icon-72x72.png",
    //         sizes: "72x72",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/android-icon-144x144.png",
    //         sizes: "144x144",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //       {
    //         src: "/icons/apple-icon-180x180.png",
    //         sizes: "180x180",
    //         type: "image/png",
    //         purpose: "any maskable"
    //       },
    //     ],
    //   },

    //   workbox: {
    //     runtimeCaching: [
    //       {
    //         // Cache GET requests

    //         // urlPattern: /^http:\/\/127.0.0.1:8000\//,
    //         urlPattern: ({ url }) => {
    //           return url.pathname.startsWith("/");
    //         },
    //         handler: 'NetworkFirst',
    //         options: {
    //           cacheName: 'ccc-cache-get',
    //           expiration: {
    //             maxAgeSeconds: 60 * 60 * 24, // Cache for 1 day
    //           },
    //           cacheableResponse: {
    //             statuses: [0, 200],
    //           },
    //         },
    //       },

    //       {
    //         // Cache POST requests
    //         urlPattern: ({ url }) => {
    //           return url.pathname.startsWith("/");
    //         },
    //         handler: 'NetworkFirst',
    //         method: 'POST',
    //         options: {
    //           cacheName: 'ccc-cache-post',
    //           backgroundSync: {
    //             name: 'ccc-post-queue',
    //             options: {
    //               maxRetentionTime: 60, // Retry for up to 1 Minutes
    //             },
    //           },
    //         },
    //       },

    //     ],
    //   },
    // }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
