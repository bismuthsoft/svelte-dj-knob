<script>
 import Knob from '$lib/ElegantKnob.svelte';
 import Options from '$lib/Options.svelte';
 import Color from 'colorjs.io';
 import {browser} from '$app/env';
 import {writable} from 'svelte/store';

 const c1 = new Color("rebeccapurple");
 const c2 = new Color("lch", [85, 100, 85]);
 const gradient = c1.range(c2, {space: 'srgb'});

 let value = writable(0);
 let darkMode = true;
 let color = 'rebeccapurple';
 let textColor = '#fff';
 let inverseTextColor = '#000';
 value.subscribe($value => {
     color = gradient($value / 100);
     darkMode = $value < 66;
     textColor = darkMode ? '#fff' : '#000';
     inverseTextColor = darkMode ? '#000' : '#fff';
     if (browser)
         document.body.style.background = color;
 });

 function knobColor(backgroundColor) {
     const color = new Color(backgroundColor);
     color.lch.h -= 20;
     color.lch.l -= 10;
     return color;
 }
</script>


<div class="flex-v" style:color="{textColor}">
    <div class="flex-h">
        <Knob
            label="svelte-dj-knob"
            size="10rem"
            min="{0}" max="{100}"
            bind:value="{$value}"
            bgColor="{textColor}"
            fgColor="{inverseTextColor}"
            valueColor="{knobColor(color)}"
        />
    </div>
    <p>
        A knob with usable controls
        similar to those in DJ software
    </p>
    <section style:border-color="{textColor}">
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
