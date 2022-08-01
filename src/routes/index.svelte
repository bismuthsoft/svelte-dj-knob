<script>
 import { writable } from 'svelte/store';
 import Knob from '$lib/Knob.svelte';
 import MinimalKnob from '$lib/MinimalKnob.svelte';
 import Options from '$lib/Options.svelte';
 let options = {
     originFix: false,
     lockCursor: true,
 };
 let value = writable(0);
</script>

<div class="flex-v">
    <div class="flex-h">
        <Knob
            label="svelte-dj-knob"
            bind:value
            size="10rem"
            textColor="white"
            {options}
        />
    </div>
    <MinimalKnob
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
 .flex-v,
 .flex-h {
     display: flex;
     align-items: center;
 }
 .flex-v {
     flex-direction: column;
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
 }
</style>
