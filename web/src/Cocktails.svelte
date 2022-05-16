<script lang="ts">
  import { Link } from "svelte-navigator";

  export let drinks;
  import Card, { Content } from "@smui/card";

  let clicked = "nothing yet";
</script>

<main>
  We have {drinks.length} cocktails
  {#each drinks as drink}
    <Link to={`/${drink.id}`}>
      <Card variant="outlined">
        <Content>
          <img src={drink.thumb} alt={drink.name} width="200" />
          {drink.name}
        </Content>
      </Card>
    </Link>
  {/each}
</main>

<pre class="status">Clicked: {clicked}</pre>

<style>
  * :global(.demo-list) {
    max-width: 300px;
  }
</style>
