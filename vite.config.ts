/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "pptx-bulk-edit",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
});
