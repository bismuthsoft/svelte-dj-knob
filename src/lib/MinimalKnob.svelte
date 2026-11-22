<script lang="ts">
	import knobdrag from './knobdrag.js';
	import Input from './Input.svelte';

	interface Props {
		// Parameters
		min?: number;
		max?: number;
		step?: number;
		value?: number;

		// Aesthetic
		size?: string;
		strokeWidth?: number;
		bgColor?: string;
		valueColor?: string;
		label?: string;
	}

	let {
		min = 0,
		max = 100,
		step: stepProp,
		value = $bindable((min + max) / 2),
		size = '5rem',
		strokeWidth = 8,
		bgColor = '#fff',
		valueColor = '#7f9fff',
		label
	}: Props = $props();

	let step = $derived(stepProp ?? (max - min) / 100);
	let inputElem = $state<HTMLInputElement | undefined>(undefined);
	let knobParams = $derived({
		min,
		max,
		step,
		getValue: () => value,
		setValue: (newValue: number) => {
			value = newValue;
		},
		inputElem
	});
</script>

<div style:display="flex" style:flex-direction="column" style:align-items="center">
	<svg
		style:width={size}
		style:height={size}
		viewBox="{-20 - strokeWidth / 2} {-20 - strokeWidth / 2} {40 + strokeWidth} {40 + strokeWidth}"
	>
		<circle
			class="knobBg"
			cx="0"
			cy="0"
			r="20"
			style:stroke={bgColor}
			style:stroke-width={strokeWidth}
			use:knobdrag={knobParams}
		/>
		<circle
			class="knobFg"
			cx="0"
			cy="0"
			r="20"
			transform="rotate({90} 0 0)"
			style:stroke={valueColor}
			style:stroke-width={strokeWidth * 0.8}
			style:stroke-dashoffset={40 * Math.PI - (40 * Math.PI * (value - min)) / (max - min)}
			style:stroke-dasharray={40 * Math.PI}
		/>
		<foreignObject x="-20" y="-20" width="40" height="40">
			<div>
				<Input bind:value bind:inputElem color={bgColor} />
			</div>
		</foreignObject>
	</svg>
	{#if label}
		<div style:font-size="calc({size} / 5)">
			{label}
		</div>
	{/if}
</div>

<style>
	.knobBg {
		fill: #0000;
		pointer-events: painted;
	}
	.knobFg {
		fill: #0000;
		pointer-events: none;
	}
	foreignObject {
		pointer-events: none;
	}
	foreignObject div {
		height: 100%;
		display: grid;
		place-items: center;
	}
</style>
