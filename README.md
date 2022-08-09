# svelte-dj-knob

This is a svelte component which provides a knob like those seen in popular DJ
software. Setting a value on the knob is not based on click position, rather
dragging up increases the value, and dragging down decreases the value. Single
clicking on the knob lets you type in an arbitrary value.

## Usage

``` svelte
<script>
 import Knob from '@bismuthsoft/svelte-dj-knob';
 let knobValue;
</script>

<Knob
    min="{0}"
    max="{100}"
    step="{0.2}"
    bind:value="{knobValue}"
    size="10rem"
    strokeWidth="{10}"
    bgColor="#fff"
    fgColor="red"
/>
```

## Developing

Install dependencies with `pnpm install` (or `npm install` or `yarn`), then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```bash
npm run package
```

