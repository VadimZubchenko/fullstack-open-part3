const config = require('./utils/config')
const express = require('express')

// Load server express
const app = express()
const cors = require('cors')

// import the router object defined in the notes module (located in ./controllers/people).
const personsRouter = require('./controllers/people') // use routers from controller

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

//(false): Mongoose allows query filters with paths not defined in the schema and ignore it without error message.
mongoose.set('strictQuery', false) //

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

//////--- Group of middlewares ---\\\\\\\\
app.use(cors())

// Middleware that serves static files from a './dist'.
app.use(express.static('dist'))

// Middleware to parse JSON data, makes the data available in req.bod
app.use(express.json())

// the requestLogger(./utils/middleware) middleware logs basic details about incoming HTTP requests
app.use(middleware.requestLogger)

// tell app to use the personsRouter for all requests starting with /api/notes.
app.use('/api/people', personsRouter)

//Initiate error handler middlewares
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
