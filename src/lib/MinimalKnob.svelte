<script lang="ts">
 import knobdrag from './knobdrag.js';
 // Parameters
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value = (min + max) / 2;
 $: knobParams = { min, max, step, value };
 // Aesthetic
 export let size = '5rem';
 export let strokeWidth = 0.4;
 export let bgColor = '#fff';
 export let fgColor = '#7f9fff';
 function onInputChange(event: {currentTarget: HTMLInputElement}) {
     if (!isNaN(event.currentTarget.value as any)) {
         value = Number(event.currentTarget.value);
     }
 }
 function formatInput(value: number) {
     return value.toFixed(2).replace(/\.?0?0?$/, '')
 }
</script>

<svg style:width="{size}"
     style:height="{size}"
     viewBox="{-1-strokeWidth/2} {-1-strokeWidth/2} {2+strokeWidth} {2+strokeWidth}">
    <circle class="knobBg" cx="0" cy="0" r="1"
            style:stroke="{bgColor}"
            style:stroke-width="{strokeWidth}"
            use:knobdrag="{knobParams}"
    />
    <circle class="knobFg" cx="0" cy="0" r="1" transform="rotate({90} 0 0)"
            style:stroke="{fgColor}"
            style:stroke-width="{strokeWidth*0.8}"
            style:stroke-dashoffset="{2*Math.PI - 2 * Math.PI*(value / (max - min) - min)}"
            style:stroke-dasharray="{2 * Math.PI}"
    />
    <foreignobject x="0" y="0" width="1" height="1">
        <input
            type="number"
            on:change="{onInputChange}"
            value="{formatInput(value)}"
        />
    </foreignobject>
</svg>

<style>
 .knobBg {
     fill: #0000;
     pointer-events: visible;
 }
 .knobFg {
     fill: #0000;
     pointer-events: none;
 }
</style>
