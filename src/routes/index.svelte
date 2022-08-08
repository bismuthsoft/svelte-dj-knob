<script>
 import MinimalKnob from '$lib/MinimalKnob.svelte';
 import Options from '$lib/Options.svelte';
 import Color from 'colorjs.io';
 import {browser} from '$app/env';

 const c1 = new Color("rebeccapurple");
 const c2 = new Color("lch", [85, 100, 85]);
 const gradient = c1.range(c2, {space: 'srgb'});

 let value = 0;
 $: color = gradient(value / 100);
 $: setBackground(color);

 const method = 'APCA'
 $: lightContrast = Math.abs(color.contrast('#fff', method));
 $: darkContrast = Math.abs(color.contrast('#000', method));
 $: fontColor = lightContrast > darkContrast ? '#fff' : '#000';

 function setBackground(color) {
     if (browser)
         document.body.style.background = color;
 }
 function knobColor(backgroundColor) {
     const color = new Color(backgroundColor);
     color.lch.h -= 20;
     color.lch.l -= 10;
     return color;
 }
</script>


<div class="flex-v" style:color="{fontColor}">
    <div class="flex-h">
        <MinimalKnob
            label="svelte-dj-knob"
            size="10rem"
            min="{0}" max="{100}"
            bind:value
            bgColor="{fontColor}"
            fgColor="{knobColor(color)}"
        />
    </div>
    <p>
        A knob with usable controls
        similar to those in DJ software
    </p>
    <section style:border-color="{fontColor}">
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
     background: rebeccapurple;
     color: white;
     font-family: sans-serif;
 }
</style>
