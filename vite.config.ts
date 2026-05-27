import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: "esnext",

    cssCodeSplit: true,

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["framer-motion"],
          gsap: ["gsap"],
        },
      },
    },
  },

  server: {
    host: true,
  },
});