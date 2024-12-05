// Use .env with psw and port
require('dotenv').config() // moved from index.js

let PORT = process.env.PORT // moved from index.js

let MONGO_URI = process.env.MONGODB_URI // from phoneBook.js

module.exports = {
  PORT,
  MONGO_URI,
}
