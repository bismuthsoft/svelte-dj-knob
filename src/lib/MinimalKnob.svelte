<script lang="ts">
 import knobdrag from './knobdrag.js';
 import type {Writable} from 'svelte/store';
 // Parameters
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value: Writable<number>;
 export let options = {};
 $: knobParams = { min, max, step, value, options };
 // Aesthetic
 export let size = '5rem';
 export let strokeWidth = 0.4;
</script>

<svg style:width="{size}"
     style:height="{size}"
     viewBox="{-1-strokeWidth/2} {-1-strokeWidth/2} {2+strokeWidth} {2+strokeWidth}">
    <circle class="knobBg" cx="0" cy="0" r="1"
            style:stroke-width="{strokeWidth}"
            use:knobdrag="{knobParams}"
    />
    <circle class="knobFg" cx="0" cy="0" r="1" transform="rotate({90} 0 0)"
            style:stroke-width="{strokeWidth*0.8}"
            style:stroke-dashoffset="{2*Math.PI - 2 * Math.PI*($value / (max - min) - min)}"
            style:stroke-dasharray="{2 * Math.PI}"
            style:pointer-events="none"
    />
</svg>

<style>
 .knobBg {
     stroke: #ffffff;
     fill: #00000000;
 }
 .knobFg {
     stroke: #7f9fff;
     fill: #00000000;
 }
</style>
