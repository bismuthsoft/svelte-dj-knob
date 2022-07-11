<script>
 import lockdrag from '$lib/lockdrag.js';
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 export let min = 0;
 export let max = 100;
 export let value = 50;
 let inputElem;
 function knobMove({detail: { movementY }}) {
     value = clamp(min, value-movementY, max);
 }
 function knobRelease({detail: { movementY }}) {
     if (movementY === 0) {
         inputElem.focus();
     }
 }
</script>

<div class="knobber"
     use:lockdrag
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}">
    <div class="knob">
        <slot {value} />
    </div>
    <input type="text" bind:value bind:this={inputElem} />
</div>

<style>
 .knobber {
     user-select: none;
     color: white;
     display: grid;
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
