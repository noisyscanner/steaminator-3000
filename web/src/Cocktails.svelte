<script lang="ts">
  export let drinks;
  export let onSelect;
  import Card, { Content } from "@smui/card";

  let clicked = "nothing yet";
</script>

<main>
  We have {drinks.length} cocktails
  {#each drinks as drink}
    <a href="#" on:click={() => onSelect(drink)}>
      <Card variant="outlined">
        <Content>
          <img src={drink.thumb} alt={drink.name} width="200" />
          {drink.name}
        </Content>
      </Card>
    </a>
  {/each}
</main>

<pre class="status">Clicked: {clicked}</pre>

<style>
  * :global(.demo-list) {
    max-width: 300px;
  }
</style>
