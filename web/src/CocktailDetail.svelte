<script>
	export let cocktail;
</script>

<main>
	<h2>{cocktail.name}</h2>
	<ul>
		{#each cocktail.ingredients as ingredient}
			<li>
				{ingredient.name} {ingredient.quantity} {ingredient.unit}
			</li>
		{/each}
</main>
