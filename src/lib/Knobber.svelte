<script>
 import lockdrag from '$lib/lockdrag.js';
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 export let min = 0;
 export let max = 100;
 export let value = 50;
 export let showLog = false;
 let inputElem;
 let log = '';
 function knobMove({detail: { movementY }}) {
     // 1 pixel deadzone because of possible firefox bug.
     // On nixos: movementY === -1 instead of 0, causing drift.
     if (true || Math.abs(movementY) > 1) {
         log = `${movementY}\n${log}`;
         value = clamp(min, value-movementY, max);
     }
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

{#if showLog}
<pre>
log:
{log}
</pre>
{/if}

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
 pre {
     height: 5em;
     overflow-y: scroll;
 }
</style>
