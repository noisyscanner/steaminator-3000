<script>
  import Cocktails from "./Cocktails.svelte";
  import { getRecentCocktails } from "./api";

  export let onSelect;

  const recentCocktails$ = getRecentCocktails();
</script>

<main>
  {#await recentCocktails$}
    <p>...waiting</p>
  {:then cocktails}
    <Cocktails drinks={cocktails} {onSelect} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</main>
