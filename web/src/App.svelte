<script>
  import { Router, Route, Link } from "svelte-navigator";
  import List from "./List.svelte";
  import CocktailDetail from "./CocktailDetail.svelte";
  import Manual from "./Manual.svelte";
</script>

<main>
  <Router>
    <h1>©️Steaminator®️ 3000 <sup>Early Access™️</sup></h1>

    <Route path=":cocktailId" component={CocktailDetail} />
    <Route path="" component={List} />
    <Route path="manual" component={Manual} />
  </Router>
</main>

<style>
  main {
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  sup {
    color: red;
  }
</style>
