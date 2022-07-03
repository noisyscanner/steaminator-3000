// Script to read from cocktail-list.json, query Cocktail API to get full detail for each, and write to Mongo document
// Then build an API around this mongo database with an actual sane response payload and filter logic

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import mapCocktail from "./mapCocktail.js";

import { MongoClient } from "mongodb";

const uri = "mongodb://BRAD-PC:27017/?maxPoolSize=20&w=majority";
const client = new MongoClient(uri);

const filename = path.resolve("/home/brad/dev/cocktail-list.json");
const file = fs.readFileSync(filename);
const { drinks } = JSON.parse(file);

const firstCocktail = drinks[0];

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
