import apiKey from "./apiKey";

const fetchApi = (path) =>
  fetch(`https://www.thecocktaildb.com/api/json/v2/${apiKey}/${path}`).then(
    (body) => body.json()
  );

const mapCocktail = (apiCocktail) => ({
  id: apiCocktail.idDrink,
  name: apiCocktail.strDrink,
  thumb: apiCocktail.strImageSource ?? apiCocktail.strDrinkThumb,
  ingredients: Object.keys(apiCocktail).reduce((acc, key) => {
    if (!key.startsWith("strIngredient")) return acc;

    const ingredient = apiCocktail[key];
    if (!ingredient) return acc;

    const i = Number(key.substring("strIngredient".length));
    const measure = apiCocktail[`strMeasure${i}`];
    const unit = /(\w+)$/g.exec(measure)?.[1].trim();
    let quantity = /^([\d\.\/ ]+)/g.exec(measure)?.[1].trim();

    // parse "1/2" as 0.5, "1 1/2" as 1.5, etc
    const quantityFraction = /^(?:(\d+) )?(\d+)\/(\d+)$/g.exec(quantity);
    if (quantityFraction) {
      let whole, numerator, denominator;
      [, whole, numerator, denominator] = quantityFraction;
      if (!whole) whole = 0;

      quantity = Number(whole) + Number(numerator) / Number(denominator);
    }
    if (typeof quantity === "string") {
      quantity = Number(quantity);
    }

    if (ingredient === "Ice" && quantity === "cubes") {
      quantity = null;
      unit = "cubes";
    }

    acc.push({ name: ingredient, quantity, unit });

    return acc;
  }, []),
  instructions: apiCocktail.strInstructions,
});

export async function getRecentCocktails() {
  return fetchApi("recent.php").then((data) => data.drinks.map(mapCocktail));
}

export async function getIngredients() {
  return fetchApi("list.php?i=list").then((data) =>
    data.drinks.map((_) => _.strIngredient1.toLowerCase()).sort()
  );
}

export async function getCocktail(cocktailId) {
  const res = await fetchApi(`lookup.php?i=${cocktailId}`);
  const [drink] = res.drinks;
  return mapCocktail(drink);
}

export async function getCocktailsWithIngredients(ingredients) {
  const ingredientsStr = Object.values(ingredients).join(",");
  const data = await fetch(
    "http://localhost:8081/drinks/?" +
      new URLSearchParams({
        ingredients: ingredientsStr,
      })
  ).then((res) => res.json());

  return data.drinks;
  // const data = await fetchApi(`filter.php?i=${ingredientsStr}`);
  // if (data.drinks === "None Found") {
  //   return [];
  // }

  // Have to make a request for each drink as the api sucks
  // return Promise.all(
  //   data.drinks.map((partialDrink) => {
  //     return getCocktail(partialDrink.idDrink);
  //   })
  // );
}

export async function getIngredientsForMachine() {
  const res = await fetch(`https://bradreed.co.uk/cocktails.json`).then(
    (body) => body.json()
  );

  return res.ingredients;
}
