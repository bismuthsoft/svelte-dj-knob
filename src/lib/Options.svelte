<script lang="ts">
 import type { OptionsI } from './lockdrag.js';
 export let options: OptionsI;
</script>

<div>
    <h2>Options</h2>
    <label title="enable if knob drifts constantly when clicked">
        <input type="checkbox" bind:checked="{options.originFix}" />
        Knob drift fix
    </label>
</div>

<style>
 div {
     padding: 1em;
     border: dotted 2px #fff8;
 }
 h2 {
     font-size: 1.2rem;
     margin-top: 0;
 }
</style>
