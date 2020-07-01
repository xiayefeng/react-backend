import { IConfig } from 'umi-types';

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  minimizer: 'terserjs',
  publicPath: '/public/',
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/users', component: '../pages/user-center/users'}
      ]
    }
  ],
  exportStatic: {
    dynamicRoot: true,
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'react-backend',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  sass: {},
  chainWebpack(config, {webpack}){
    // config.resolve.alias.set('@', resolve('src'))
  },
  alias: {
    '@': resolve('src')
  },
  define: {
    'process.env.URL': '/api'
  }
}

export default config;
