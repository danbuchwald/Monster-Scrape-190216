// Scrape D&D database and combine monster data into a more easily-used format

const dataFromDB=require("./response.json");

console.log(dataFromDB.results[0].url);