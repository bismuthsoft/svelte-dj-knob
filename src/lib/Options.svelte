<script lang="ts">
 import options from './options.js';
</script>

<label title="Prevent cursor from moving while dragging knob">
    <input type="checkbox" bind:checked="{$options.lockCursor}" />
    Lock Cursor
</label>

<style>
 label {
     display: block;
 }
</style>
