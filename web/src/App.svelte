<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import List from "./List.svelte";
  import CocktailDetail from "./CocktailDetail.svelte";
  import Manual from "./Manual.svelte";
  import Banner from "./Banner.svelte";
  import { getIngredientsForMachine } from "./api";
  import { ingredients } from "./stores";

  getIngredientsForMachine().then((data) => {
    ingredients.set(data);
  });
</script>

<main>
  <Router>
    <Banner />

    <Route path=":cocktailId" component={CocktailDetail} />
    <Route path="" component={List} />
    <Route path="manual" component={Manual} />
  </Router>
</main>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
    text-align: center;
  }
</style>
