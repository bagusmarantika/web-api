const proxy = require('http-proxy-middleware')

module.exports = function(app) {

  require('dotenv').config()

  const apiUrl = process.env.API_URL
  const apiToken = process.env.API_TOKEN
  const headers  = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + apiToken
  }

  // define http-proxy-middleware
  let DOProxy = proxy({
    target: apiUrl,
    changeOrigin: true,
  pathRewrite: {
    '^/api/' : '/'
  },
    headers: headers,
  })

  // define the route and map the proxy
  app.use('/api', DOProxy)

};