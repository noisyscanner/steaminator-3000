export default (apiCocktail) => ({
  id: apiCocktail.idDrink,
  name: apiCocktail.strDrink,
  thumb: apiCocktail.strImageSource ?? apiCocktail.strDrinkThumb,
  ingredients: Object.keys(apiCocktail).reduce((acc, key) => {
    if (!key.startsWith("strIngredient")) return acc;

    const ingredient = apiCocktail[key];
    if (!ingredient) return acc;

    const i = Number(key.substring("strIngredient".length));
    const measure = apiCocktail[`strMeasure${i}`]?.trim() ?? "";
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
