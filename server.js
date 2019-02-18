// Scrape D&D database and combine monster data into a more easily-used format

const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const port = process.env.PORT;
const dataFromAPI = require("./response.json");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(
    () => console.log("Connected to the database"),
    err => console.log("Cannot connect to database " + err)
  );

let db = mongoose.connection;

const monsterSchema = new mongoose.Schema({
  name: String,
  alignment: String,
  hit_dice: String
});

const Monster = mongoose.model("Monster", monsterSchema);

const currentEntry = dataFromAPI.results[0].url;
console.log("First entry:", currentEntry);

for (let i = 0; i < 4; i += 1) {
  axios
    .get(dataFromAPI.results[i].url)
    .then(response => console.log(response.data.name))
    .catch(err => console.log(err));
  console.log(`Monster number ${i} retrieved: *************`);
}

app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
