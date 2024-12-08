const { info } = require('./logger')

const requestLogger = (req, resp, next) => {
  info('Method:', req.method) // Logs the HTTP method (e.g., GET, POST)
  info('Path:  ', req.path) // Logs the req path (e.g., /api/notes)
  info('Body:  ', req.body) // Logs the req body (if any)
  info('---') // Divider for readability
  next() // Passes control to the next middleware or route handler
}

// Unknown endpoint handled middleware
const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

// Error handled middleware
const errorHandler = (error, req, resp, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'Please, check id' })
  } else if (error.name === 'ValitdationError') {
    return resp.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
