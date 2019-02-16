// Scrape D&D database and combine monster data into a more easily-used format

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT;
const dataFromDB = require("./response.json");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(
    () => console.log("Connected to the database"),
    err => console.log("Cannot connect to database " + err)
  );

console.log("First entry:", dataFromDB.results[0].url);
// console.log("Connnection string: ", process.env.DB);

app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
