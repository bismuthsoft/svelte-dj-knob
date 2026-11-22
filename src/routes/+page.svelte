<script lang="ts">
	import ElegantKnob from '../lib/ElegantKnob.svelte';
	import MinimalKnob from '../lib/MinimalKnob.svelte';
	import Options from '../lib/Options.svelte';
	import Color from 'colorjs.io';

	const c1 = new Color('rebeccapurple');
	const c2 = new Color('lch', [85, 100, 85]);
	const gradient = c1.range(c2, { space: 'srgb' });

	let style = $state<'minimal' | 'elegant'>('minimal');
	let value = $state(0);
	let color = $derived(gradient(value / 100));
	let darkMode = $derived(value < 66);
	let textColor = $derived(darkMode ? '#fff' : '#000');
	let inverseTextColor = $derived(darkMode ? '#000' : '#fff');

	$effect(() => {
		document.body.style.background = color.toString();
	});

	function knobColor(backgroundColor: Color): string {
		const next = backgroundColor.clone();
		next.lch.h = (next.lch.h ?? 0) - 20;
		next.lch.l = (next.lch.l ?? 0) - 10;
		return next.toString();
	}
</script>

<div class="flex-v" style:color={textColor}>
	{#if style === 'minimal'}
		<MinimalKnob
			label="svelte-dj-knob"
			size="10rem"
			min={0}
			max={100}
			bind:value
			bgColor={textColor}
			valueColor={knobColor(color)}
		/>
	{:else}
		<ElegantKnob
			label="svelte-dj-knob"
			size="10rem"
			min={0}
			max={100}
			bind:value
			bgColor={textColor}
			fgColor={inverseTextColor}
			valueColor={knobColor(color)}
		/>
	{/if}
	<p>
		A knob with usable controls
		similar to those in DJ software
	</p>
	<section style:border-color={textColor}>
		<h2>Options</h2>
		<Options />
		<h2>Style</h2>
		<select bind:value={style} style:border-color={textColor}>
			<option value="minimal">Minimal</option>
			<option value="elegant">Elegant</option>
		</select>
	</section>
</div>

<style>
	.flex-v {
		display: flex;
		align-items: center;
		flex-direction: column;
		place-items: center;
	}
	p {
		text-align: center;
		max-width: 25ch;
	}
	section {
		padding: 1em;
		border: dotted 2px white;
	}
	h2 {
		display: block;
		font-size: 1.2rem;
		font-weight: bold;
		margin: 0.5em 0;
	}
	h2:first-child {
		margin-top: 0;
	}
	select {
		color: inherit;
		width: 100%;
		border-radius: 0.5em;
		background: none;
		border: solid 1px white;
		padding: 0.5em 0.25em;
	}
	:global(body) {
		margin: 0;
		display: grid;
		place-items: center;
		height: 100vh;
		background: rebeccapurple;
		color: white;
		font-family: sans-serif;
	}
</style>
