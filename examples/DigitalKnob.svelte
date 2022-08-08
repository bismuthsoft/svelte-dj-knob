<script lang="ts">
 import type { LockDragEvent } from './lockdrag.js';
 import lockdrag from '$lib/lockdrag.js';
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value = 5;
 export let size = '5rem';
 export let options = {};

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
 function onInputChange(event: {currentTarget: HTMLInputElement}) {
     if (!isNaN(event.currentTarget.value as any)) {
         value = Number(event.currentTarget.value);
     }
 }
</script>

<div class="knobber"
     style:width="{size}"
     style:height="{size}"
     use:lockdrag="{options}"
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}">
    <div class="box">
        <div class="value"> {Math.floor(value/10)} </div>
    </div>
    <input type="text"
           bind:this="{inputElem}"
           on:change="{onInputChange}"
           {value}

    />
</div>

<style>
 .knobber {
     user-select: none;
     display: inline-grid;
     place-items: center;
 }
 .box {
     grid-area: 1/1/1/1;
     display: inline-grid;
     background-color: #1f7fff;
     outline: 8px solid white;
     border-radius: 16px;
     width: 80px;
     height: 80px;
 }
 .value {
     text-align: center;
     align-self: center;
     font-size: 60px;
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
