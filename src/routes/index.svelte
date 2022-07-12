<script>
 import Knob from '$lib/Knob.svelte';
 import Knobber from '$lib/Knobber.svelte';
</script>

<Knobber let:value>
    <Knob {value} />
</Knobber>

<style>
 :global(body) {
     margin: 0;
     display: grid;
     place-items: center;
     height: 100vh;
     background: #66A;
     font-family: sans-serif;
 }
</style>
