module.exports = {
  // srcDir: __dirname,
  server: {
    port: 8199,
    host: '127.0.0.1'
  },
  build: {
    vendor: ['axios']
  },
  css: [
    '~/assets/main.css'
  ],
  head: {
    title: 'share.wx.fritx.me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Auth Routes example' }
    ]
  },
  loading: { color: '#3B8070' }
}
