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
        manualChunks(id: string) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/gsap")) return "gsap";
        },
      },
    },
  },

  server: {
    host: true,
  },
});