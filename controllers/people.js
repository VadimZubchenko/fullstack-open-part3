const personsRouter = require('express').Router() //Every Express application has a built-in app router.
const Person = require('../models/phoneBook')

//This endpoint works just when ./dist is out of use
personsRouter.get('/', (req, resp) => {
  resp.send('<h1>Puhelinluettelo</h1>')
})

// Get All persons
personsRouter.get('/', (req, resp) => {
  Person.find({}).then((person) => {
    resp.json(person)
  })
})

// Get One person
personsRouter.get('/:id', (req, resp, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        resp.json(person)
      } else {
        resp.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// Create one person
personsRouter.post('/', (req, resp, next) => {
  // Raw data in json format of request changed into javascript-object and stored≤ in req.body with middleware express.json()
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number || false,
  })
  person
    .save()
    .then((savedPerson) => {
      resp.json(savedPerson)
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        resp.status(400).json({ error: error })
        console.log('error msg: ', error)
      } else {
        next(error.message)
        console.log('error msg: ', error)
      }
    })
})

// Delete one person
personsRouter.delete('/:id', (req, resp, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      resp.status(204).end()
    })
    .catch((error) => next(error))
})

// Update person
personsRouter.put('/:id', (req, resp, next) => {
  const { name, number } = req.body
  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      resp.json(updatedPerson)
    })
    .catch((error) => next(error))
})

personsRouter.get('/info', (req, resp) => {
  const count = Person.length
  const currentDate = new Date()
  resp.send(
    `Phonebook has info of ${count} people <br></br>
    ${currentDate}`
  )
})

module.exports = personsRouter
