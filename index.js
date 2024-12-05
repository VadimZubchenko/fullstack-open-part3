const app = require('./app') // varsinainen Express-sovellus
const config = require('./utils/config')
const { info } = require('./utils/logger')

// Start application server (backend)
app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})
