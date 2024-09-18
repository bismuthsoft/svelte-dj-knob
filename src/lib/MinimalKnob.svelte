<script lang="ts">
 import knobdrag, {makeValueStore} from '$lib/knobdrag.js';
 import Input from '$lib/Input.svelte';

 // Parameters
 export let min = 0;
 export let max = 100;
 export let step = (max - min) / 100;
 export let value = (min + max) / 2;
 const valueStore = makeValueStore(value, newValue => value = newValue);
 $: valueStore.set(value);
 let inputElem: Element;
 $: knobParams = { min, max, step, valueStore, inputElem };

 // Aesthetic
 export let size = '5rem';
 export let strokeWidth = 8;
 export let bgColor = '#fff';
 export let valueColor = '#7f9fff';
 export let textColor = '#fff'
 export let label: string | undefined = undefined;

</script>

<div style:display="flex" style:flex-direction="column" style:align-items="center">
    <svg style:width="{size}"
         style:height="{size}"
         viewBox="{-20-strokeWidth/2} {-20-strokeWidth/2} {40+strokeWidth} {40+strokeWidth}">
        <circle class="knobBg" cx="0" cy="0" r="20"
                style:stroke="{bgColor}"
                style:stroke-width="{strokeWidth}"
                use:knobdrag="{knobParams}"
        />
        <circle class="knobFg" cx="0" cy="0" r="20" transform="rotate({90} 0 0)"
                style:stroke="{valueColor}"
                style:stroke-width="{strokeWidth*0.8}"
                style:stroke-dashoffset="{40*Math.PI - 40 * Math.PI * (value - min) / (max - min)}"
                style:stroke-dasharray="{40 * Math.PI}"
        />
        <foreignObject x="-20" y="-20" width="40" height="40">
            <div>
                <Input
                    bind:value
                    bind:inputElem
                    color="{textColor}"
                />
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
