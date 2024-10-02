const express = require("express");
var morgan = require("morgan");

// Use .env with psw and port
require("dotenv").config();

// Using a Mongoose setting as a module
const Person = require("./models/phoneBook");

// Load server exrpess
const app = express();

// create custom token in order to produce log with req body
morgan.token("body", function (req, res) {
  let body = req.body;
  return JSON.stringify(body);
});

// Middleware to parse JSON data, makes the data available in req.bod
app.use(express.json());

// Create a new morgan logger middleware
// using format string of created custom token with body.
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(express.static("dist"));

//This endpoint works just when dist is out of use
app.get("/", (req, resp) => {
  resp.send("<h1>Puhelinluettelo</h1>");
});

// Get All persons
app.get("/api/people", (req, resp) => {
  Person.find({}).then((person) => {
    resp.json(person);
  });
});
// Get One person
app.get("/api/people/:id", (req, resp, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        resp.json(person);
      } else {
        resp.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// Delete one person
app.delete("/api/people/:id", (req, resp, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      resp.status(204).end();
    })
    .catch((error) => next(error));
});

// Create one person
app.post("/api/people", (req, resp) => {
  // Raw data in json format of request changed into javascript-object and stored≤ in req.body with middleware express.json()
  const body = req.body;

  if (!body.name || !body.number) {
    return resp.status(400).json({ error: "content missing" });
  }
  /*   if (Person.find({}).then((p) => p.name === body.name)) {
    return resp.status(409).json({ error: "name must be unique" });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    resp.json(savedPerson);
  });
});
// Update person
app.put("/api/people/:id", (req, resp, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      resp.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get("/info", (req, resp) => {
  const count = Person.length;
  const currentDate = new Date();
  resp.send(
    `Phonebook has info of ${count} people <br></br>
    ${currentDate}`
  );
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}/`);
});
