<script lang="ts">
  import { Link } from "svelte-navigator";
  import type { Drink } from "./types";

  export let drinks: Drink[];
</script>

<main>
  <strong>{drinks.length} cocktails available</strong>
  {#each drinks as drink}
    <Link to={`/${drink.id}`}>
      <div class="content">
        <img src={drink.thumb} alt={drink.name} class="img" />
        <span>
          {drink.name}
        </span>

        <div class="overlay" />
      </div>
    </Link>
  {/each}
</main>

<style>
  .content {
    display: flex;
    position: relative;
    height: 350px;
    width: 350px;
    margin: 20px auto;
    overflow: hidden;
  }

  .content img,
  .content span,
  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .content img {
    transition: transform 0.3s ease-in-out;
  }

  .content:hover img {
    transform: scale(1.1);
  }

  .content span {
    display: inline-flex;
    align-self: flex-end;
    text-align: left;
    top: unset;
    color: white;
    font-size: 28pt;
    line-height: 1.5;
    padding: 0.3em;
    z-index: 2;
  }

  .overlay {
    background: linear-gradient(0deg, black, transparent);
    z-index: 1;
  }

  .content img {
    width: 100%;
  }
</style>
