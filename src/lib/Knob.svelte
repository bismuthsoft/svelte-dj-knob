<script lang="ts">
 import type { LockDragEvent } from './lockdrag.js';
 import lockdrag from '$lib/lockdrag.js';
 import DumbKnob from '$lib/DumbKnob.svelte';
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value = 50;
 export let size = '5rem';
 export let textColor = '';
 export let options = {};
 export let label = '';
 let inputElem: HTMLElement;
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
         inputElem.focus();
     }
 }
</script>

<div class="knobber"
     use:lockdrag="{options}"
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}">
    <div class="knob">
        <DumbKnob
            {value} {min} {max} {label} {size} {textColor}
        />
    </div>
    <input type="text"
           bind:this="{inputElem}"
           on:change="{e => value = e.target.value}"
           {value}

    />
</div>

<style>
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
     font-size: 2rem;
     width: 2em;
     text-align: center;
     background: #0000;
     color: #0000;
     border: none;
 }
 input:focus {
     color: white;
 }
</style>
