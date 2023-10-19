/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    include: ["./__tests__/**", "**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./vitest-setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@/": path.join(__dirname, "./"),
    },
  },
});
