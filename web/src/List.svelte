<script>
  import Cocktails from "./Cocktails.svelte";
  import Ingredients from "./Ingredients.svelte";
  import { getCocktailsWithIngredients, getIngredientsForMachine } from "./api";

  export let onSelect;

  let ingredients = [];
  const ingredients$ = getIngredientsForMachine();
  ingredients$.then((data) => {
    ingredients = data;
  });

  $: cocktails$ = getCocktailsWithIngredients(ingredients);

  /* ingredients$.then((ingredients) => { */
  /*   cocktails$ = getCocktailsWithIngredients(ingredients); */
  /* }); */

  $: {
    console.log("current ingredients", ingredients);
  }
</script>

<main>
  <Ingredients bind:ingredients />

  {#await cocktails$}
    <p>...waiting</p>
  {:then cocktails}
    <Cocktails drinks={cocktails} {onSelect} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
