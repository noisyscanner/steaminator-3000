import { get } from "svelte/store";
import { ingredients } from "./stores";
import type { Drink } from "./types";
const COCKTAIL_URL = "http://192.168.0.93:3000";

export async function brew(data: BodyInit) {
  await fetch(`${COCKTAIL_URL}/brew`, {
    method: "POST",
    body: data,
    mode: "no-cors",
  });
}

const ML_PER_PART = 50;

export async function makeCocktail(cocktail: Drink) {
  const data = new URLSearchParams();
  const ingredientsValue = get(ingredients);
  const allUnits = new Set(cocktail.ingredients.map((i) => i.unit));
  if (allUnits.size > 1) {
    throw Error("Cannot make cocktail if we have different units in recipe");
  }

  const totalVolume = cocktail.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.quantity,
    0
  );

  for (const ingredient of cocktail.ingredients) {
    const pin = ingredientsValue[ingredient.name.toLowerCase()];
    const { quantity } = ingredient;
    let percentage = totalVolume / quantity;
    const mlAmount = percentage * ML_PER_PART;
    data.append(pin, `${mlAmount}`);
  }

  await brew(data);
}

export async function switchPins(data: BodyInit) {
  await fetch(`${COCKTAIL_URL}/switch`, {
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
