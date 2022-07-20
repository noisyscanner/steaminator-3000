// Script to read from cocktail-list.json, query Cocktail API to get full detail for each, and write to Mongo document
// Then build an API around this mongo database with an actual sane response payload and filter logic

import "dotenv/config";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { MongoClient } from "mongodb";
import mapCocktail from "./mapCocktail.js";

let filename = process.argv[2];
if (!filename) {
  throw Error("Filename not provided");
}

filename = path.resolve(filename);
if (!fs.existsSync(filename)) {
  throw Error("File does not exist");
}

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const file = fs.readFileSync(filename);
const { drinks } = JSON.parse(file);

const apiKey = "9973533";

const fetchApi = (path) =>
  fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/${path}`).then(
    (body) => body.json()
  );

async function getCocktail(cocktailId) {
  const res = await fetchApi(`lookup.php?i=${cocktailId}`);
  console.log(res);
  const [drink] = res.drinks;
  return mapCocktail(drink);
}

await client.connect();
const coll = client.db("recipes").collection("recipes");

for (const drink of drinks) {
  try {
    const cocktail = await getCocktail(drink.idDrink);
    await coll.insertOne(cocktail);
  } catch (err) {
    console.error(err);
  }
}

await client.close();
