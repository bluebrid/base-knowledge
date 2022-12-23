import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app2",
      filename: "remoteEntry.js",
      library: { type: "module" },
      exposes: {
        "./App": "./src/App.jsx",
        "./App2": "./src/App2.jsx",
      },
      shared: ["react"],
    }),
  ],
});
