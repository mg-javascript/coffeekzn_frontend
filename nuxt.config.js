const nodeExternals = require('webpack-node-externals')
const { resolve } = require('path')

module.exports = {
  srcDir: resolve('./src'),
  head: {
    title: 'COFFEEKZN',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Каталог лучших кофеен Казани, где вы гарантированно получите отличный кофе' },
      { property: 'og-title', content: 'Кофейная карта Казани' },
      { property: 'og-type', content: 'website' },
      { property: 'og-url', content: 'http://coffeekzn.ru' },
      { property: 'pg:description', content: 'Каталог лучших кофеен Казани, где вы гарантированно получите отличный кофе' },
      { property: 'og:image', content: 'coffeekzn.ru/coffee.png' },
      { property: 'og:site_name', content: "Кофейная карта Казани" }
    ],
    bodyAttrs: {
      class: 'search'
    },
    link: [
      { rel: 'apple-touch-icon', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://fonts.googleapis.com/css?family=Montserrat:400,300,700' },
      { rel: 'stylesheet', href: 'http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://fonts.googleapis.com/css?family=Rammetto+One' }
    ],
    script: [
      { src: '/js/jquery.js' }, 
      { src: '/js/popper.js' },
      { src: '/js/moment.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/bootstrap-datetimepicker.min.js' },
      { src: '/js/bootstrap-switch.min.js' },
      { src: '/js/paper-kit.js' }
    ],
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', '~assets/css/bootstrap.min.css', '~assets/css/nucleo-icons.css', '~assets/css/paper-kit.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['vue2-google-maps'],

    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      } else {
        config.externals = [ nodeExternals({
          whitelist: ['vue2-google-maps']
        })]
      }
    }
  },
  modules: [
    ['@nuxtjs/yandex-metrika',
      {
        id: '47433361',
        webvisor: true
        // clickmap:true,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }],
    ['@nuxtjs/google-analytics', 
      {
        id: 'UA-113062292-1'
      }]
  ],  
  /*
  ** Plugins
  */
  plugins: [
    '~plugins/maps'
  ]
}
