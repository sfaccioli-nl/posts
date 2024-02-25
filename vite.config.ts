import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import { configDefaults } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist", "out"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
