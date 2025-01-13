import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/App.svelte",
      name: "ardennesmegatrail-faq",
      fileName: (format) => `ardennesmegatrail-faq.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.names &&
            assetInfo.names.some((name) => name.endsWith(".css"))
          ) {
            return "ardennesmegatrail-faq.css";
          }
          return assetInfo.names ? assetInfo.names[0] : "";
        },
      },
    },
  },
});
