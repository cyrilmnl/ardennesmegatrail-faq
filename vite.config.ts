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
    lib: {
      entry: "./src/App.svelte",
      name: "ardennesmegatrail-faq",
      fileName: (format) => `ardennesmegatrail-faq.${format}.js`,
      formats: ["es"],
    },
  },
});
