<script>
 import lockDrag from '$lib/lockDrag.js'
 let val = 50;
 let min = 0;
 let max = 100;
 const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
 function updateVal(drag) {
     val = clamp(min, val+drag, max);
 }
</script>

<div class="knob" use:lockDrag={updateVal}>
    {val}
</div>

<style>
 .knob {
     height: 6rem;
     width: 6rem;
     font-size: 2rem;
     user-select: none;
     background: black;
     color: white;
     display: grid;
     place-items: center;
     border-radius: 50%;
 }
</style>
