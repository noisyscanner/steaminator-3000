// Script to read from cocktail-list.json, query Cocktail API to get full detail for each, and write to Mongo document
// Then build an API around this mongo database with an actual sane response payload and filter logic

const fs = require("fs");
const path = require("path");

const filename = path.resolve("/Users/brad/Downloads/cocktail-list.json");
const file = fs.readFileSync(filename);
const json = JSON.parse(file);

console.log(json);
