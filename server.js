// Scrape D&D database and combine monster data into a more easily-used format

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const port = process.env.PORT;
const dataFromDB = require("./response.json");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(
    () => console.log("Connected to the database"),
    err => console.log("Cannot connect to database " + err)
  );

const currentEntry = dataFromDB.results[0].url;
console.log("First entry:", currentEntry);

axios
  .get(currentEntry)
  .then(response => console.log(response.data))
  .catch(err => console.log(err));
  
app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
