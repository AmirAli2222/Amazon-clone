import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    "process.env": process.env, //  Ensures environment variables work
  },
});