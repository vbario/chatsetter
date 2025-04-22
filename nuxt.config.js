export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ChatSetter.ai',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/settings.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-gtag',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: `AIzaSyDitRvy93aF3ODZl_L3SACg6nwIk1meGtE`,
          authDomain: `mypage-25a24.firebaseapp.com`,
          databaseURL: `https://mypage-25a24-default-rtdb.firebaseio.com`,
          projectId: `mypage-25a24`,
          storageBucket: `mypage-25a24.appspot.com`,
          messagingSenderId: `245001666457`,
          appId: `1:245001666457:web:b7da57d000c6fc4e045d08`,
          measurementId: `G-2DVM3BDNMS`
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation: 'auth/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'auth/handleAuth',
              subscribeManually: false
            },
            ssr: true, // default
          //   emulatorPort: 9099,
          //   emulatorHost: 'http://localhost',
          },
          functions: {
            "source": ".output/server",
            ...(process.env.NODE_ENV === 'development' && {
              emulatorHost: 'http://localhost',
              emulatorPort: 5001
            }),
            // emulatorPort: 5001,
            // emulatorHost: `http://localhost`
          },
          database: true,
          storage: true
        }
      }
    ]
  ],
  'google-gtag': {
    // your GA4 measurement ID
    id: 'G-2DVM3BDNMS',
    // only send hits in production
    debug: false,              // enable for dev to see console logs
    disableAutoPageTrack: false // set true to track manually
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vue-chartjs',
      'chart.js'
    ]
  }
}
