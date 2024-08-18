const express = require("express");
var morgan = require("morgan");

const app = express();

app.use(express.json());

// Using a predefined format string with the minimal output.
app.use(morgan("tiny"));

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

app.get("/api/persons", (req, resp) => {
  resp.json(persons);
});

app.get("/api/persons/:id", (req, resp) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    resp.json(person);
  } else {
    resp.status(404).end();
  }
});
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

app.post("/api/persons", (req, resp) => {
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
