import { extendRoutes } from './static/js/routeInfo'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '广新纳-找建材，找服务，招采信息，建筑规范，国内领先建筑交流平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '广新纳，建材信息，招采信息，我需要服务，我提供服务，建筑社区，找工作' },
      { hid: 'description', name: 'description', content: '广新纳建筑信息交流平台，国内专业的本地、真实、高效服务平台！找建材，找招采信息，找服务，找工作，建筑规范，建筑资讯，广新纳一站解决！为你提海量建筑信息，充分满足您查看/发布信息的需求。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: '//at.alicdn.com/t/font_2272077_9s7njp71r4u.css' }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    './assets/style/global.scss',
    './assets/style/iconimg.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/utils',
    {
      src: '@/plugins/amfe-flexible',
      ssr: false
    },
    {
      src: '@/plugins/isMobile',
      ssr: false
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      'assets/style/vars.scss',
    ]
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: process.env.NUXT_ENV_MODE === 'prd' ? 'https://main.conschina.com/static' : '/_nuxt/',
    extractCSS: { allChunks: true, ignoreOrder: true },
    // analyze: true,
    transpile: [/^element-ui/, /vant.*?less/],
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "~assets/style/theme"
          }
        ],
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            }
          },
          'vant'
        ],
      ]
    },
    postcss: [
      require('postcss-pxtorem')({
        rootValue: input => input.file.match(/\\node_modules\\vant/) ? 37.5 : 75,
        propList: ['*', '!font-size'],
        //exclude: /(\\node_modules\\element-ui)|(\\node_modules\\vant)|(element-variables)/,
      }),
      // require('autoprefixer')({
      //   browsers: ['Android >= 4.0', 'iOS >= 7']
      // }),
    ],
  },
  router: {
    // prefetchLinks: false,
    middleware: 'redirect',
    extendRoutes,
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
}
