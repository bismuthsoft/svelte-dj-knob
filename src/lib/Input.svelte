<script lang="ts">
	interface Props {
		value?: number;
		inputElem?: HTMLInputElement;
		color?: string;
		format?: (value: number) => number | string;
	}

	let {
		value = $bindable(0),
		inputElem = $bindable(),
		color,
		format = (val: number) => Math.floor(val * 100) / 100
	}: Props = $props();

	function onInputChange(event: Event & { currentTarget: HTMLInputElement }) {
		const newValue = Number(event.currentTarget.value);
		if (!Number.isNaN(newValue)) {
			value = newValue;
		} else {
			event.currentTarget.value = format(value).toString();
		}
	}
</script>

<input
	type="text"
	bind:this={inputElem}
	onchange={onInputChange}
	value={format(value)}
	style:color
/>

<style>
	input {
		width: 100%;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		pointer-events: none;
	}
	input:focus {
		pointer-events: auto;
	}
</style>
