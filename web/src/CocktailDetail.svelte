<script>
  import { Link } from "svelte-navigator";
  import { getCocktail } from "./api";
  import { makeCocktail } from "./machine";

  export let cocktailId;

  $: isMaking = false;
  $: cocktail$ = getCocktail(cocktailId);

  async function handleMake(cocktail) {
    isMaking = true;
    await makeCocktail(cocktail);
    isMaking = false;
  }
</script>

<div>
  <Link to="/">Go Back</Link>
  {#await cocktail$}
    <p>Loading cocktail...</p>
  {:then cocktail}
    <h2>{cocktail.name}</h2>
    <img src={cocktail.thumb} alt={cocktail.name} />

    <h3>Ingredients</h3>
    <ul>
      {#each cocktail.ingredients as ingredient}
        <li>
          {ingredient.name}
          {ingredient.quantity}
          {ingredient.unit}
        </li>
      {/each}
    </ul>

    <h3>Recipe</h3>
    <article>
      {cocktail.instructions}
    </article>

    <p>
      <button on:click={() => handleMake(cocktail)} disabled={isMaking}>
        {isMaking ? "Making..." : "MAKE"}
      </button>
    </p>
  {/await}
</div>

<style>
  img {
    max-height: 200px;
  }

  ul {
    padding: 0;
    list-style: none;
  }
</style>
