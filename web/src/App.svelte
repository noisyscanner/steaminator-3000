<script>
  import { Router, Route, Link } from "svelte-navigator";
  import List from "./List.svelte";
  import CocktailDetail from "./CocktailDetail.svelte";
  import Manual from "./Manual.svelte";
</script>

<main>
  <Router>
    <h1>©️Steaminator®️ 3000 <sup>Early Access™️</sup></h1>
    <h2>Where dreams begin...</h2>
    <img
      alt="logo"
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/36c41aa3-fcd7-4b79-a830-2b93dab2558f/d88887k-06c27b1e-66be-4122-b2af-5379b37efcd9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM2YzQxYWEzLWZjZDctNGI3OS1hODMwLTJiOTNkYWIyNTU4ZlwvZDg4ODg3ay0wNmMyN2IxZS02NmJlLTQxMjItYjJhZi01Mzc5YjM3ZWZjZDkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.A784Wo2bP4ICTA1A1QjBP78kogYAy9QYdFgRQQ8bJ6Y"
      in:doABarrelRoll={{ duration: 3000 }}
      out:fade
    />

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

  h2 {
    font-family: cursive;
    font-style: italic;
  }
  img {
    height: 200px;
  }

  sup {
    color: red;
  }
</style>
