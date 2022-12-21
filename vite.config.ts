import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
//import styleImport,{AntdResolve} from "vite-plugin-style-import";
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:4000,
    proxy:{
      //拦截以aip开头的接口地址

      '/api': {
        //本地服务器发起 向目标服务器
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite:(path:string)=>{
          return path.replace(/^\/api/,'')
        }

      }

    }
  },
  plugins: [
      react(),
      // styleImport({
      //   resolves:[
      //       AntdResolve()
      //   ],
      // })
  ],

  resolve:{
    alias:{
      "@":path.resolve(__dirname, './src')
    }
  }
})
