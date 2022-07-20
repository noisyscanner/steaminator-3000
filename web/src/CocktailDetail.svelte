<script>
  import { Link } from "svelte-navigator";
  import { getCocktail } from "./api";
  import { makeCocktail } from "./machine.ts";
  import Chip, { Text } from "@smui/chips";
  import LayoutGrid, { Cell } from "@smui/layout-grid";

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
    <LayoutGrid>
      <Cell span={6}>
        <h2>{cocktail.name}</h2>
        <img src={cocktail.thumb} alt={cocktail.name} />
      </Cell>
      <Cell span={6}>
        <h2>Ingredients</h2>
        <div class="ingredients">
          <ul>
            {#each cocktail.ingredients as ingredient}
              <li>
                {ingredient.name}
                <Chip chip={ingredient}>
                  <Text>{ingredient.quantity} {ingredient.unit}</Text>
                </Chip>
              </li>
            {/each}
          </ul>
        </div>
      </Cell>
    </LayoutGrid>

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
    height: 300px;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  li {
    font-size: 14pt;
    padding: 5px;
  }

  .ingredients {
    text-align: left;
  }
</style>
