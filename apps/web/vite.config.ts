import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.join(__dirname, "..");
const electronDir = path.join(projectDir, "main");
const electronWebDir = path.join(electronDir, "src", "render");

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: electronWebDir, // 指定打包目录为dist
  },
  server:{
    port:3001,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react()],
})
