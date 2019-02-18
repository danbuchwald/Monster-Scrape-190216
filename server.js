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
  api_index: Number,
  name: String,
  number_appearing: String,
  alignment: String,
  hit_dice: String,
  type: String,
  frequency: String,
  habitat: String
});

const Monster = mongoose.model("Monster", monsterSchema);

const currentEntry = dataFromAPI.results[0].url;
console.log("First entry:", currentEntry);

for (let i = 0; i < 325; i += 1) {
  axios
    .get(dataFromAPI.results[i].url)
    .then(response => {
      let monster = new Monster({
        api_index: response.data.index,
        name: response.data.name,
        number_appearing: "TK",
        alignment: response.data.alignment,
        hit_dice: response.data.hit_dice,
        type: response.data.type,
        frequency: "TK",
        habitat: "TK"
      });
      monster.save(err => {
        if (err) return next(err);
      });
      console.log(response.data.name + " created successfully");
    })
    .catch(err => console.log(err));
}

app.get("/", (req, res) => {
  res.send("Hello world!!!!");
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
