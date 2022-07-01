const COCKTAIL_URL = "http://192.168.0.93:3000";

// TODO: Map of ingredients to pins on client side, store on server side (dumb flat file node server?)
export async function makeCocktail(cocktail) {
  const data = new URLSearchParams();
  data.append("0", "250");
  data.append("1", "350");

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
