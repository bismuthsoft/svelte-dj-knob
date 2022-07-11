<script>
 import lockDrag from '$lib/lockDrag.js'
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 let value = 50;
 let updated = false;
 let input;
 function updateVal(drag) {
     if (drag !== 0) {
         value = clamp(0, value+drag, 100);
         updated = true;
     }
 }
 function pointerDown(event) {
     updated = false;
 }
 function pointerUp(event) {
     if (!updated) {
         console.log('focusing', input);
         input.focus();
     }
 }
</script>

<div use:lockDrag="{updateVal}"
     on:pointerdown="{pointerDown}"
     on:pointerup="{pointerUp}">
    <input type="text" bind:value bind:this={input} />
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
