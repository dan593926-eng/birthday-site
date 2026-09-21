import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // относительный base — чтобы сайт корректно работал на GitHub Pages
  // (например https://username.github.io/repo-name/)
  base: "./",
});
