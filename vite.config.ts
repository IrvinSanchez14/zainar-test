import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generateFile from 'vite-plugin-generate-file';
import { qrcode } from 'vite-plugin-qrcode';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    generateFile([{
      type: 'json',
      output: './output.txt',
      data: { foo: 'bar' }
    }]),
    qrcode(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
