<script>
  import { Router, Route, Link } from "svelte-navigator";
  import List from "./List.svelte";
  import Ingredients from "./Ingredients.svelte";
  import CocktailDetail from "./CocktailDetail.svelte";

  /* let selectedCocktailId = null; */

  // Problem - initial fetch only loads 10, not all cocktails
  // filter query then only returns some fields, not ingredients
  function setCocktails(newCocktails$) {
    Promise.all([recentCocktails$, newCocktails$]).then(
      ([recentCocktails, newCocktails]) => {
        const filteredCocktails = newCocktails.map(({ id }) =>
          recentCocktails.find(
            (recentCocktail) =>
              console.log({ recentCocktail }) || recentCocktail.id === id
          )
        );
        console.log(newCocktails, recentCocktails, filteredCocktails);
        recentCocktails$ = Promise.resolve(filteredCocktails);
      }
    );
  }

  /* function handleSelect(newCocktail) { */
  /*   console.log(newCocktail); */
  /*   selectedCocktailId = newCocktail.id; */
  /* } */
</script>

<main>
  <Router>
    <h1>Steaminator 3000</h1>

    <!-- TODO: Move this into a settings or something where we map pins to ingredients -->
    <!-- <Ingredients {setCocktails} /> -->

    <Route path=":cocktailId" component={CocktailDetail} />
    <Route path="" component={List} />
  </Router>
</main>

<style>
  main {
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
</style>
