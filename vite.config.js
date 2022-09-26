/*
 * @Created on: 2022-09-15 23:38:33
 * @@LastEditTime: 2022-09-27 00:54:07
 * @@Author: fduxuan
 * 
 * @@Desc: 
 * 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'arcoblue-6': '#12416A',
          // 'primary-6': '#12416A',
          'primary-6': '#12416A',
        },
      }
    }
  },

  server: {
    port: '3000',
    open: false, //自动打开
    base: "./ ", //生产环境路径
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://tesla.hqsautomotive.com/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },

})
