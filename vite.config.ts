import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {imagetools} from "vite-imagetools";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        // Resizes big source photos at build time. Use `?hero` or `?card` on an image import.
        imagetools({
            defaultDirectives: (url) => {
                if (url.searchParams.has("hero"))
                    return new URLSearchParams({w: "2400", format: "avif", quality: "60"});
                if (url.searchParams.has("card"))
                    return new URLSearchParams({w: "1400", format: "avif", quality: "55"});
                return new URLSearchParams();
            },
        })
    ],

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