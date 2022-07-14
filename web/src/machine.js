import { get } from "svelte/store";
import { ingredients } from "./stores.ts";
const COCKTAIL_URL = "http://192.168.0.93:3000";

export async function makeCocktail(cocktail) {
  const data = new URLSearchParams();
  const ingredientsValue = get(ingredients);
  for (const ingredient of cocktail.ingredients) {
    const pin = ingredientsValue[ingredient.name.toLowerCase()];
    let { quantity, unit } = ingredient;
    if (!unit) {
      quantity *= 50; // no unit = ratio, 50ml per part
    }
    data.append(pin, quantity);
  }

  await fetch(`${COCKTAIL_URL}/brew`, {
    method: "POST",
    body: data,
    mode: "no-cors",
  });
}

export async function isHealthy() {
  try {
    await fetch(COCKTAIL_URL);
    return true;
  } catch (err) {
    return false;
  }
}
