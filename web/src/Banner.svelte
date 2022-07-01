<script>
  import { isHealthy } from './machine.js';
  const isHealthy$ = isHealthy();
  console.log(isHealthy$);
</script>

{#await isHealthy$}
  <span class="connecting">Connecting...</span>
{:then isHealthy}
  <span class={isHealthy ? 'connected':'disconnected'}>
    {isHealthy ? 'Connected' : 'Disconnected'}
  </span>
{/await}

<style>
  span {
    display: block;
    padding: 1rem;
    font-size: 14pt;
  }

  .disconnected {
    background: red;
  }

  .connected {
    background: green
  }

  .connecting {
    background: yellow;
  }
</style>
