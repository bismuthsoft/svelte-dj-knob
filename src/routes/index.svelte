<script>
 import Knob from '$lib/Knob.svelte';
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
