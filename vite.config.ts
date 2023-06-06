import vue from '@vitejs/plugin-vue';
// import ElementPlus from 'unplugin-element-plus/dist/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: '@import "/src/styles/main.scss";',
  //     },
  //   },
  // },
  ssr: {
    format: 'cjs',
    // ssr 환경에서 ag-grid-vue3 import 경로 못찾아서 추가했습니다.
    noExternal: ['vue-multiselect'],
  },
  server: {
    hmr: {
      protocol: 'ws',
      // 개발 모드로 서버 실행 시 다른 프로젝트에서 사용중인
      // vite websocket port(기본: 24678)와 충돌 피하기 위해서 무작위 포트 설정
      port: 15319,
    },
  },
  envDir: '.env',
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});