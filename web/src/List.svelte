<script>
  import Cocktails from "./Cocktails.svelte";
  import Ingredients from "./Ingredients.svelte";
  import { getCocktailsWithIngredients } from "./api";
  import { ingredients } from "./stores";

  export let onSelect;

  let ingredientsValue;
  let cocktails$;

  ingredients.subscribe((value) => {
    ingredientsValue = Object.keys(value);
    cocktails$ = getCocktailsWithIngredients(ingredientsValue);
  });
</script>

<main>
  <Ingredients bind:ingredients={ingredientsValue} />

  {#await cocktails$}
    <p>...waiting</p>
  {:then cocktails}
    <Cocktails drinks={cocktails} {onSelect} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
