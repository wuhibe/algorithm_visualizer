const searchGrid = (grid: string[][], word: string) => {
	// create initial vars
	let visited = new Set();
	const currentWord = '';

	// function to search the grid for 'word'
	const dfs = (row: number, col: number, currentWord: string, index: number) => {
		if (
			row < 0 ||
			row >= grid.length ||
			col < 0 ||
			col >= grid[row].length ||
			visited.has(`${row}, ${col}`) ||
			grid[row][col] != word[index]
		)
			return;

		visited.add(`${row}, ${col}`);
		currentWord += grid[row][col];

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

		return false;
	};

	// traverse the grid
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (dfs(i, j, currentWord, 0)) return visited;
			visited = new Set();
		}
	}
	return false;
};

export default searchGrid;
