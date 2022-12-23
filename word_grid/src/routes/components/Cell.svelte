<script>
	export let cell = { char: 'x', state: 'default' };
</script>

<span class={cell.state}>{cell.char}</span>

<style>
	* {
		font-size: x-large;
		width: 30px;
		height: 30px;
		border-radius: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 6px;
	}
	.default {
		border: solid 1px dimgray;
		background-color: #fff7e8;
		color: #262719;
	}
	.success {
		width: 26px;
		height: 26px;
		border: solid 3px #2f5c30;
		background-color: #4a8810;
		color: #e6e8d8;
	}
	.check {
		width: 26px;
		height: 26px;
		border: solid 3px #464837;
		background-color: #efc16c;
		color: #121307;
	}
</style>
