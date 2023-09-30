import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/dist/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: [...configDefaults.include, "./__tests__/*"],
    environment: "jsdom",
  },
});
