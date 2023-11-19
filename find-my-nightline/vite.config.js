import {defineConfig, loadEnv} from 'vite'
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'


export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    base: "/dist",
    plugins: [vue()],
    define: {
      "process.env": env,
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.js'),
        name: 'Find My Nightline',
      },
      watch: {},
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name].js',
          chunkFileNames: 'assets/js/[name].js',
          assetFileNames: 'assets/css/[name].[ext]'
        }
      }
    },
  });
};