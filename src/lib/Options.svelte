<script lang="ts" context="module">
 import { writable } from 'svelte/store';
 export const options = writable({
     lockCursor: true,
 });
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
