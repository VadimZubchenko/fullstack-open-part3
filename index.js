const express = require("express");
var morgan = require("morgan");

// Load server exrpess
const app = express();

// create custom token in order to produce log with req body
morgan.token("body", function (req, res) {
  let body = req.body;
  return JSON.stringify(body);
});

// Middleware to parse JSON data, makes the data available in req.bod
app.use(express.json());

// Using format string of created custom token with body.
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: "2",
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: "4",
  },
];

app.get("/", (req, resp) => {
  resp.send("<h1>Puhelinluettelo</h1>");
});
// Get All persons
app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});
// Get One person
app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    resp.json(person);
  } else {
    resp.status(404).end();
  }
});
// Delete one person
app.delete("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);
  resp.send(`Note with id: ${id} has been removed!`);
  resp.status(204).end();
});

const generateID = () => {
  let Id = Math.floor(Math.random() * (persons.length + 10));

  while (persons.find((n) => Number(n.id) === Id)) {
    Id = Math.floor(Math.random() * (persons.length + 10));
  }

  return String(Id);
};
// Create one person
app.post("/api/persons", (req, resp) => {
  // Raw data of request changed into json and stored in req.body with middleware express.json()
  const body = req.body;

  if (!body.name || !body.number) {
    return resp.status(400).json({ error: "content missing" });
  }
  if (persons.find((p) => p.name === body.name)) {
    return resp.status(409).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };
  persons = persons.concat(person);
  resp.json(person);
});

app.get("/info", (req, resp) => {
  const count = persons.length;
  const currentDate = new Date();
  resp.send(
    `Phonebook has info of ${count} people <br></br>
    ${currentDate}`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
