import apiKey from "./apiKey";
import type { Drink, IngredientMap } from "./types";

const fetchApi = (path: string) =>
  fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/${path}`).then(
    (body) => body.json()
  );

const fetchLocalApi = (path: string) =>
  fetch(`http://localhost:8081/${path}`).then((body) => body.json());

export async function getIngredients() {
  return fetchApi("list.php?i=list").then((data) =>
    data.drinks.map((_) => _.strIngredient1.toLowerCase()).sort()
  );
}

export async function getCocktail(cocktailId: string) {
  const res = await fetchLocalApi(`drink/${cocktailId}`);
  return res.drink as Drink;
}

export async function getCocktailsWithIngredients(ingredients: IngredientMap) {
  const ingredientsStr = Object.values(ingredients).join(",");
  const data = await fetchLocalApi(
    "drinks/?" +
      new URLSearchParams({
        ingredients: ingredientsStr,
      })
  );

  return data.drinks as Drink[];
}

export async function getIngredientsForMachine() {
  const res = await fetch(`https://bradreed.co.uk/cocktails.json`).then(
    (body) => body.json()
  );

  return res.ingredients as IngredientMap;
}
