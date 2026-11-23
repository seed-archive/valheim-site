import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Needed only for the `@/` imports the site's code uses (tsconfig `paths`).
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL(".", import.meta.url)) } },
});
