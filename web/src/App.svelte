<script>
  import { getRecentCocktails } from "./api";
  import Ingredients from "./Ingredients.svelte";
  import Cocktails from "./Cocktails.svelte";
  import CocktailDetail from "./CocktailDetail.svelte";
  let recentCocktails$ = getRecentCocktails();
  let selectedCocktail = null;

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

  function handleSelect(newCocktail) {
    recentCocktails$.then((cocktails) => {
      const cocktailObj = cocktails.find(({ id }) => id === newCocktail.id);
      /* console.log(newCocktail, cocktailObj); */
      selectedCocktail = cocktailObj;
    });
  }
</script>

<main>
  <h1>Steaminator 3000</h1>

  <Ingredients {setCocktails} />

  {#if selectedCocktail}
    <CocktailDetail cocktail={selectedCocktail} />
  {/if}

  {#await recentCocktails$}
    <p>...waiting</p>
  {:then cocktails}
    <Cocktails drinks={cocktails} onSelect={handleSelect} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>

<style>
  main {
    padding: 1em;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
</style>
