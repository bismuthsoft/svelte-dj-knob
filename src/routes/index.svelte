<script>
 import Knob from '$lib/Knob.svelte';
 import MinimalKnob from '$lib/MinimalKnob.svelte';
 import DigitalKnob from '$lib/DigitalKnob.svelte';

 import Options from '$lib/Options.svelte';
 let options = {
     originFix: false,
 };
 let value = 0;
</script>

<div>
    <Knob
        label="svelte-dj-knob"
        bind:value
        size="10rem"
        textColor="white"
        {options}
    />
    <MinimalKnob
        bind:value
        size="10rem"
        {options}
    />
    <DigitalKnob
        bind:value
        size="10rem"
        {options}
    />
    <p>
        A knob with usable controls
        similar to those in DJ software
    </p>
    <Options bind:options />
</div>

<style>
 div {
     display: flex;
     flex-direction: column;
     place-items: center;
 }
 p {
     text-align: center;
     max-width: 25ch;
 }
 :global(body) {
     margin: 0;
     display: grid;
     place-items: center;
     height: 100vh;
     background: #65A;
     color: white;
     font-family: sans-serif;
     overflow: hidden;
 }
</style>
