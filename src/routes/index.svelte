<script>
 import MinimalKnob from '$lib/MinimalKnob.svelte';
 import Options from '$lib/Options.svelte';
 let value = 0;
</script>

<div class="flex-v">
    <div class="flex-h">
        <MinimalKnob
            label="svelte-dj-knob"
            bind:value
            size="10rem"
        />
    </div>
    <p>
        A knob with usable controls
        similar to those in DJ software
    </p>
    <section>
        <heading>Options</heading>
        <Options />
   </section>
</div>

<style>
 .flex-v,
 .flex-h {
     display: flex;
     align-items: center;
 }
 .flex-v {
     flex-direction: column;
     place-items: center;
 }
 p {
     text-align: center;
     max-width: 25ch;
 }
 section {
     padding: 1em;
     border: dotted 2px #fff8;
 }
 heading {
     display: block;
     font-size: 1.2rem;
     font-weight: bold;
     margin-bottom: .5em;
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
