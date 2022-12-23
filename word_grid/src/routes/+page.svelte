<script>
	import Grid from './components/Grid.svelte';
	import searchGrid from '../algorithm';
	let rows = 2;
	let cols = 4;
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	let word = '';
	let grid = [
		[
			{ char: 'w', state: 'default' },
			{ char: 'o', state: 'default' },
			{ char: 'r', state: 'default' },
			{ char: 'd', state: 'default' }
		],
		[
			{ char: 'g', state: 'default' },
			{ char: 'r', state: 'default' },
			{ char: 'i', state: 'default' },
			{ char: 'd', state: 'default' }
		]
	];
	const genGrid = () => {
		let g = [];
		if (rows < 1 || rows > 14 || cols < 1 || cols > 30) {
			return;
		}
		for (let i = 0; i < rows; i++) {
			let row = [];
			for (let j = 0; j < cols; j++) {
				row.push({ char: chars[Math.floor(Math.random() * chars.length)], state: 'default' });
			}
			g.push(row);
		}
		grid = g;
	};
	const searchWord = async () => {
		grid.forEach((row) => {
			row.forEach((element) => {
				element.state = 'default';
			});
		});
		let x = searchGrid(grid, word);
		if (x) {
			let i = 1;
			x.forEach((element) => {
				setTimeout(() => {
					grid[+element.split(',')[0]][+element.split(',')[1]].state = 'success';
				}, 150 * i);
				i++;
			});
		}
		console.log(x);
	};
</script>

<div class="menu">
	<form>
		<label>
			<span><b>Rows</b></span>
			<input type="number" min="1" max="14" bind:value={rows} />
		</label>
		<label>
			<span><b>Cols</b></span>
			<input type="number" min="1" max="30" bind:value={cols} />
		</label>
		<button on:click={genGrid}>Generate Grid</button>
	</form>
	<form>
		<label>
			<span><b>Search Phrase:</b> </span>
			<input type="text" bind:value={word} />
		</label>
		<button on:click={searchWord}>Search Word</button>
	</form>
	<Grid {grid} />
</div>

<style>
	* {
		border-radius: 6px;
	}
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}
	form {
		margin: 10px;
	}
	input[type='number'] {
		height: 20px;
		width: 35px;
	}
	input[type='text'] {
		text-align: center;
		font-weight: 600;
	}
	button {
		padding: 5px;
		background-color: #123;
		color: white;
	}
</style>
