<script>
	import Grid from './components/Grid.svelte';

	const chars = 'abcdefghijklmnopqrstuvwxyz',
		currentWord = '';
	let rows = 2,
		cols = 4,
		visited = new Set(),
		answer = new Set(),
		word = '',
		grid = [
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

	const generateGrid = () => {
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

	const searchWord = () => {
		// set cell colors to default after every search
		grid.forEach((row) => {
			row.forEach((element) => {
				element.state = 'default';
			});
		});
		let x = searchGrid(word);

		// display search process and results
		if (x) {
			let time = displaySearchProcess();
			setTimeout(() => displayResults(x), time);
		}
	};

	const displaySearchProcess = () => {
		let j = 1;
		visited.forEach((element) => {
			setTimeout(() => {
				grid[+element.split(',')[0]][+element.split(',')[1]].state = 'check';
			}, 120 * j);
			j++;
		});
		return (j + 1) * 120;
	};

	const displayResults = (x) => {
		let i = 1;
		x.forEach((element) => {
			setTimeout(() => {
				grid[+element.split(',')[0]][+element.split(',')[1]].state = 'success';
			}, 150 * i);
			i++;
		});
	};

	const searchGrid = (word) => {
		// function to search the grid for 'word'
		const dfs = (row, col, currentWord, index) => {
			if (row < 0 || row >= grid.length || col < 0 || col >= grid[row].length) return;
			visited.add(`${row}, ${col}`);

			if (answer.has(`${row}, ${col}`) || grid[row][col].char != word[index]) return;
			answer.add(`${row}, ${col}`);

			currentWord += grid[row][col].char;

			// if 'word' found in grid, return
			if (currentWord === word) return true;

			// increment index and search adjacent letters recursively
			index++;
			if (
				dfs(row + 1, col, currentWord, index) ||
				dfs(row - 1, col, currentWord, index) ||
				dfs(row, col + 1, currentWord, index) ||
				dfs(row, col - 1, currentWord, index)
			)
				return true;
			answer.delete(`${row}, ${col}`);
			return false;
		};

		// traverse the grid
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (dfs(i, j, currentWord, 0)) return answer;
				answer = new Set();
			}
		}
		return false;
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
		<button on:click={generateGrid}>Generate Grid</button>
	</form>
	<form>
		<label>
			<span><b>Search Phrase:</b> </span>
			<input type="text" bind:value={word} />
		</label>
		<button on:click={searchWord}>Search Word</button>
	</form>
	<hr />
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
	hr {
		margin-top: -5px;
		width: 60vw;
		border: solid 1px white;
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
