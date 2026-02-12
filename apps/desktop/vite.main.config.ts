import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js'
    },
    outDir: path.resolve(__dirname, 'dist/main'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['electron', 'electron-log', 'keytar']
    }
  }
});
