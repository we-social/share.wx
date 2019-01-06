const express = require('express')
const { Nuxt, Builder } = require('nuxt')

const app = express()

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8199
const isProd = process.env.NODE_ENV === 'production'

// Import and set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = !isProd

const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Start express server
app.listen(port, host, () => {
  console.log('Server is listening on http://localhost:8199')
})
