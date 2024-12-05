const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
//moved from index.js
const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

//Error handled middleware
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
