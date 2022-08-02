<script lang="ts">
 import type { LockDragEvent } from './lockdrag.js';
 import lockdrag from '$lib/lockdrag.js';
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value = 50;
 export let size = '5rem';
 export let strokeWidth = 0.4;
 export let bgColor: string;
 export let fgColor: string;
 export let options = {};
 let inputElem: HTMLInputElement;
 function clamp(a: number, b: number, c: number): number {
     return Math.min(Math.max(a, b), c);
 }
 function knobMove(event: LockDragEvent) {
     const movementY: number = event.detail.movementY;
     if (movementY) {
         value = clamp(min, value - (movementY*step), max);
     }
 }
 function knobRelease({detail: { movementY }}: LockDragEvent) {
     if (movementY === 0) {
         inputElem.select();
     }
 }
 function onInputChange(event: {currentTarget: HTMLInputElement}) {
     if (!isNaN(event.currentTarget.value as any)) {
         value = Number(event.currentTarget.value);
     }
 }
 function formatInput(value: number) {
     return value.toFixed(2).replace(/\.?0?0?$/, '')
 }
</script>

<div class="knobber"
     style:width="{size}"
     style:height="{size}"
     use:lockdrag="{options}"
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}">
    <div class="knob">
        <svg viewBox="{-1-strokeWidth/2} {-1-strokeWidth/2} {2+strokeWidth} {2+strokeWidth}">
            <circle class="knobBg" cx="0" cy="0" r="1"
                    style:stroke="{bgColor}"
                    style:stroke-width="{strokeWidth}"
            />
            <circle class="knobFg" cx="0" cy="0" r="1" transform="rotate({90} 0 0)"
                    style:stroke="{fgColor}"
                    style:stroke-width="{strokeWidth*0.8}"
                    style:stroke-dashoffset="{2*Math.PI - 2 * Math.PI*(value / (max - min) - min)}"
                    style:stroke-dasharray="{2 * Math.PI}"
            />
        </svg>
        <div class="knobValue"></div>
    </div>
    <input type="number"
           bind:this="{inputElem}"
           on:change="{onInputChange}"
           value="{formatInput(value)}"
    />
</div>

<style>
 .knobBg {
     stroke: #fff;
     fill: #0000;
 }
 .knobFg {
     stroke: #7f9fff;
     fill: #0000;
 }
 .knobber {
     user-select: none;
     display: inline-grid;
     place-items: center;
 }
 .knob {
     grid-area: 1/1/1/1;
 }
 input {
     grid-area: 1/1/1/1;
     z-index: 5;
     user-select: none;
     pointer-events: none;
     font-size: 1rem;
     width: 2em;
     text-align: center;
     background: #0000;
     border: none;
 }
 /* Hide spin buttons on <input type="number"> */
 /* source: https://stackoverflow.com/a/27935448 */
 input[type="number"]::-webkit-outer-spin-button,
 input[type="number"]::-webkit-inner-spin-button {
     -webkit-appearance: none;
     margin: 0;
 }
 input[type="number"] {
     -moz-appearance: textfield;
 }
</style>
