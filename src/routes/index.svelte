<script>
 import Knob from '$lib/Knob.svelte';
 import DumbKnob from '$lib/DumbKnob.svelte';
 import Options from '$lib/Options.svelte';
 let options = {
     originFix: false,
 };
</script>

<Knob let:value bind:originFix={options.originFix}>
    <DumbKnob {value} label="svelte-dj-knob" />
</Knob>
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
 .config {
     padding: .8em 1em;
     background: #fff3;
 }
 .config h2 {
     font-size: 1.2rem;
     margin-top: 0;
 }
</style>
