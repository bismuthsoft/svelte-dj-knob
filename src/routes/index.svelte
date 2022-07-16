<script>
 import Knob from '$lib/Knob.svelte';
 import DumbKnob from '$lib/DumbKnob.svelte';
 import Options from '$lib/Options.svelte';
 let options = {
     originFix: false,
 };
 let myValue = 0;
</script>

<Knob
    component="{DumbKnob}"
    label="svelte-dj-knob"
    bind:value="{myValue}"
    {options}
/>
<p>
    A knob with usable controls
    similar to those in DJ software
</p>

<Options bind:options />

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
