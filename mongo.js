const mongoose = require("mongoose");

// When there's no password as argument
if (process.argv.length < 3) {
  console.log("give password");
  process.exit(1);
}
// When there's no name and number as arguments
else if (process.argv.length < 4) {
  const password = process.argv[2];

  const url = `mongodb+srv://VadimZ:${password}@cluster0.g65io.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, " ", person.number);
    });
    mongoose.connection.close();
  });
} else {
  const password = process.argv[2];
  const name = process.argv[3];
  const number = process.argv[4];

  const url = `mongodb+srv://VadimZ:${password}@cluster0.g65io.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: `${name}`,
    number: `${number}`,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number}`);
    mongoose.connection.close();
  });
}
