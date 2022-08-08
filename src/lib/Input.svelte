<script lang="ts">
 export let value: number;
 export let inputElem: Element;
 export let color: string;
 export let format = (value: number) => {
     return Math.floor(value * 100) / 100;
 }
 function onInputChange(event: {currentTarget: HTMLInputElement}) {
     const newValue = Number(event.currentTarget.value);
     if (!Number.isNaN(newValue)) {
         value = newValue;
     }
 }
</script>

<input
    type="text"
    bind:this="{inputElem}"
    on:change="{onInputChange}"
    value="{format(value)}"
    style:color
/>

<style>
 input {
     width: 100%;
     text-align: center;
     background: none;
     border: none;
     outline: none;
     pointer-events: none;
 }
 input:focus {
     pointer-events: auto;
 }
</style>
