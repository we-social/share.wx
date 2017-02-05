const Nuxt = require('nuxt')
const app = require('express')()

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// No build in production
// const promise = (isProd ? Promise.resolve() : nuxt.build())
const promise = nuxt.build()
promise.then(() => {
  app.use(nuxt.render)
  app.listen(8199)
  console.log('Server is listening on http://localhost:8199')  // eslint-disable-line no-console
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('isProd', isProd)
})
.catch((error) => {
  console.error(error)  // eslint-disable-line no-console
  process.exit(1)
})
