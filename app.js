const config = require('./utils/config')
const express = require('express') // moved from index.js
// Load server exrpess
const app = express() // moved from index.js
const cors = require('cors')
const personsRouter = require('./controllers/people')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose') // from models/phoneBook

//(false): Mongoose allows query filters with paths not defined in the schema and ignore it without error message.
mongoose.set('strictQuery', false) // from models/phoneBook

logger.info('connecting to', config.MONGODB_URI) // from models/phoneBook

// from models/phoneBook
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
// Middleware that serves static files from a './dist'.
app.use(express.static('dist')) //from index.js
// Middleware to parse JSON data, makes the data available in req.bod
app.use(express.json()) // from index.js
app.use(middleware.requestLogger)

app.use('/api/people', personsRouter)

//Initiate error handler middlewares
app.use(middleware.unknownEndpoint) // from index.js
app.use(middleware.errorHandler) // from index.js

module.exports = app
