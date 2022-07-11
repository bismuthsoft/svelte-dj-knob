<script>
 import lockdrag from '$lib/lockdrag.js'
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 let value = 50;
 let inputElem;
 function knobMove({detail: { movementY }}) {
     value = clamp(0, value-movementY, 100);
 }
 function knobRelease({detail: { movementY }}) {
     if (movementY === 0) {
         inputElem.focus();
     }
 }
</script>

<div use:lockdrag
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}" >
    <input type="text" bind:value bind:this={inputElem} />
</div>

<style>
 div {
     height: 6rem;
     width: 6rem;
     user-select: none;
     background: black;
     color: white;
     display: grid;
     place-items: center;
     border-radius: 50%;
 }
 input {
     user-select: none;
     pointer-events: none;
     font-size: 2rem;
     width: 2em;
     text-align: center;
     background: #0000;
     color: white;
     border: none;
 }
</style>
