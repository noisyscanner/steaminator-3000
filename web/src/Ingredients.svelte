<script>
	import { getIngredients, getCocktailsWithIngredients } from './api';

	export let setCocktails;

	let selectedIngredients = [];
	let ingredients$ = getIngredients();

	function updateIngredients(e) {
		selectedIngredients = Array.from(e.target.selectedOptions).map(el => el.value);
	}

	/* $: { */
	/* 	console.log(selectedIngredients); */
	/* } */

	async function go() {
		const drinks = getCocktailsWithIngredients(selectedIngredients);
		/* drinks.then(console.log); */
		setCocktails(drinks);
	}
</script>

<main>
	{#await ingredients$}

	{:then data}
		<select multiple style="height: 400px" on:change={updateIngredients}>
			{#each data as ingredient}
				<option>{ingredient}</option>
			{/each}
		</select>
		<button on:click={go}>Go</button>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>
