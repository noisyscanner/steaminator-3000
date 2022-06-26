<script>
  import Cocktails from "./Cocktails.svelte";
  import Ingredients from "./Ingredients.svelte";
  import { getRecentCocktails, getIngredientsForMachine } from "./api";

  export let onSelect;

  $: recentCocktails = [];
  $: ifm = [];
  getIngredientsForMachine().then(ingredientsForMachine => {
    ifm = ingredientsForMachine;
    /* let recentCocktails$ = getRecentCocktails(); */
    recentCocktails = getCocktailsWithIngredients(ingredientsForMachine);
  })

  function setCocktails(newCocktails$) {
    recentCocktails$ = newCocktails$;
  }
</script>

<main>
    <!-- TODO: Pull ingredients from JSON on server (for pins) -->
    <Ingredients {setCocktails} />

  {#await recentCocktails$}
    <p>...waiting</p>
  {:then cocktails}
    <Cocktails drinks={cocktails} {onSelect} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
