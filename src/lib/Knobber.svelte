<script>
 import lockdrag from '$lib/lockdrag.js';
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 export let min = 0;
 export let max = 100;
 export let value = 50;
 function knobMove({detail: { movementY }}) {
     value = clamp(min, value-movementY, max);
 }
</script>

<div use:lockdrag
     on:lockdrag="{knobMove}">
    <slot {value} />
</div>
