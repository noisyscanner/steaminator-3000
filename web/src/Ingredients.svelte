<script>
  import Select from "svelte-select";
  import { getIngredients, getCocktailsWithIngredients } from "./api";

  export let ingredients = [];

  const ingredients$ = getIngredients();

  function updateIngredients(e) {
    const newValues = e.detail || [];
    ingredients = newValues.map((item) => item.value);
  }
</script>

<main>
  {#await ingredients$ then data}
    <Select
      items={data.map((ingredient) => ({
        value: ingredient,
        label: ingredient,
      }))}
      {ingredients}
      on:select={updateIngredients}
      isMulti
    />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
