import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// defineConfig : 사용자 IDE 의 인텔리센스를 활용하기 위한 도우미 함수
export default defineConfig(({ command, mode, ssrBuild }) => {
  // const env = loadEnv(mode, process.cwd(), '')
  if (command === 'serve') {
    // 개발 서버 설정
    return {
      plugins: [react()],
      // define: {
      //   __APP_ENV__: JSON.stringify(env.APP_ENV),
      // },
      mode: 'development',
    }
  } else {
    // 배포 서버 설정
    // command === 'build'
    return {
      plugins: [react()],
      server: {
        proxy: {
          // '/api': 'http://localhost:5173', // 실제 API 서버 주소로 변경
          // '/api': 'file:///Users/moldy/nodeworkspace/vite/vite/react/dist/', // 실제 API 서버 주소로 변경
          '/api': {
            target: 'file:///Users/moldy/nodeworkspace/vite/vite/react/dist/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            secure: false,
            ws: true,
          },
        },
      },
      base: './',
      mode: 'production',
    }
  }
})
