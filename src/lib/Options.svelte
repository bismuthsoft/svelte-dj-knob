<script lang="ts">
 import type { OptionsI } from './lockdrag.js';
 export let options: OptionsI;
</script>

<label title="Enable if knob drifts constantly when clicked">
    <input type="checkbox" bind:checked="{options.originFix}" />
    Knob Drift Fix
</label>

<label title="Prevent cursor from moving while dragging knob">
    <input type="checkbox" bind:checked="{options.lockCursor}" />
    Lock Cursor
</label>

<style>
 label {
     display: block;
 }
</style>
