<script>
  import { get } from "svelte/store";
  import { ingredients } from "./stores.ts";
  import { brew, switchPins } from "./machine.ts";

  const noOfPins = 8;
  const pins = new Array(noOfPins).fill().map((_, i) => i + 1);

  async function handleDispense(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = new URLSearchParams();
    for (const [pin, ml] of formData.entries()) {
      data.append(pin, ml || 0);
    }

    await brew(data);
  }

  async function handleSwitch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = new URLSearchParams();
    for (const [pin, value] of formData.entries()) {
      if (value === "skip") continue;
      data.append(pin, value === "on" ? 1 : 0);
    }

    await switchPins(data);
  }

  async function handleAll(value) {
    const data = new URLSearchParams();
    for (let i = 1; i <= 8; i++) {
      data.append(`${i}`, value);
    }

    await switchPins(data);
  }

  async function handleSingle(pin, value) {
    const data = new URLSearchParams();
    data.append(`${pin}`, value);

    await switchPins(data);
  }

  async function test() {
    for (let i = 1; i <= noOfPins; i++) {
      console.log(i);
      await handleSingle(i, 1);
      await new Promise(r => setTimeout(r, 1000));
      await handleSingle(i, 0);
    }
  }

  let pinsToIngredients;
  ingredients.subscribe((val) => {
    pinsToIngredients = Object.fromEntries(
      Object.entries(val).map(([k, v]) => [v, k])
    );
  });
</script>

<button on:click={() => handleAll(1)}>All on</button>
<button on:click={() => handleAll(0)}>All off</button>
<button on:click={() => test()}>Test</button>

<form on:submit={handleDispense}>
  <strong>Dispense</strong>
  {#each pins as pin}
    <label for={`pin${pin}`}>
      Pin {pin} (<strong>{pinsToIngredients[pin] ?? "none"}</strong>)
    </label>
    <input type="number" id={`pin${pin}`} name={pin} />
    <button type="button" on:click={() => handleSingle(pin, 1)}>On</button>
    <button type="button" on:click={() => handleSingle(pin, 0)}>Off</button>
  {/each}

  <br />
  <input type="submit" />
</form>

<form on:submit={handleSwitch}>
  <strong>Turn on/off</strong>
  <ul>
    {#each pins as pin}
      <li>
        Pin {pin} (<strong>{pinsToIngredients[pin] ?? "none"}</strong>)
        <br />

        <div class="radio">
          <label for={`pin${pin}skip`}>Skip</label>
          <input
            type="radio"
            id={`pin${pin}skip`}
            name={pin}
            value="skip"
            checked
          />
        </div>

        <div class="radio">
          <label for={`pin${pin}on`}>On</label>
          <input type="radio" id={`pin${pin}on`} name={pin} value="on" />
        </div>

        <div class="radio">
          <label for={`pin${pin}off`}>Off</label>
          <input type="radio" id={`pin${pin}off`} name={pin} value="off" />
        </div>
      </li>
    {/each}
  </ul>

  <br />
  <input type="submit" />
</form>

<style>
  .radio {
    display: inline-flex;
    vertical-align: middle;
  }

  ul {
    list-style: none;
  }
</style>
