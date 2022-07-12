<script>
 import Knob from '$lib/Knob.svelte';
 import Knobber from '$lib/Knobber.svelte';
</script>

<Knobber let:value>
    <Knob {value} label="svelte-dj-knob" />
</Knobber>
<p>
    A knob with usable controls
    similar to those in DJ software
</p>

<style>
 p {
     text-align: center;
     max-width: 25ch;
 }
 :global(body) {
     margin: 0;
     display: grid;
     place-items: center;
     height: 100vh;
     background: #66A;
     font-family: sans-serif;
 }
</style>
