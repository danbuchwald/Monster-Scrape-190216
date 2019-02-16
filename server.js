// Scrape D&D database and combine monster data into a more easily-used format

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const dataFromDB = require("./response.json");

console.log("First entry:", dataFromDB.results[0].url);
console.log("Port is: ", port);
