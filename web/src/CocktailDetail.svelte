<script lang="ts">
  import { Link } from "svelte-navigator";
  import { getCocktail } from "./api";
  import { makeCocktail } from "./machine";
  import Chip, { Text } from "@smui/chips";
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import type { Drink } from "./types";

  export let cocktailId: string;

  let isMaking = false;
  const cocktail$ = getCocktail(cocktailId);

  async function handleMake(cocktail: Drink) {
    isMaking = true;
    try {
      await makeCocktail(cocktail);
    } catch (err) {
      console.error(err);
    } finally {
      isMaking = false;
    }
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

    <button on:click={() => handleMake(cocktail)} disabled={isMaking}>
      {isMaking ? "Making..." : "MAKE"}
    </button>
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

  button {
    font-size: 32pt;
    border-radius: 5px;
    border: 1px solid;
    cursor: pointer;
    padding: 0.5em 1em;
    background: #42b10a;
    color: #fff;
    transition: background 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin: 0.5rem 0 0;
    position: sticky;
    bottom: 0;
  }

  button:disabled {
    cursor: unset;
  }

  button:hover,
  button:disabled {
    background: #286807;
  }
</style>
