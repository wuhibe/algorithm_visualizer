<script>
	import Cell from './Cell.svelte';
	/**
	 * @type {string[][]}
	 */
	export let grid;
</script>

<div class="parent">
	{#each grid as row}
		<div class="row">
			{#each row as cell}
				<Cell {cell} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.row {
		display: inline-flex;
	}
	.parent {
		display: grid;
		background-color: #c5d0dc;
		border-radius: 5px;
		width: max-content;
		padding: 5px;
	}
</style>
