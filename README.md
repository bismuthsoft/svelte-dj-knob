# svelte-dj-knob

This is a svelte component which provides a knob like those seen in popular DJ
software. Setting a value on the knob is not based on click position, rather
dragging up increases the value, and dragging down decreases the value. Single
clicking on the knob lets you type in an arbitrary value.

## Usage

The most basic usage is to import the default knob and configure it with props:

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

For more advanced usage, copy `./src/lib/MinimalKnob.svelte` into your own
project, and replace `$lib` with `@bismuthsoft/svelte-dj-knob`). The minimal
knob is < 100 LOC with most of its functionality being imported from other files
in the library.

Hint: When designing a custom knob, scale the knob so the value text is 16px, as
the blinking cursor of an <input> in a <svg> cannot be scaled.

## Known issues

Versions of firefox older than 103 (or 102 ESR) has a bug which caused the knob
to drift constantly on some DPI / zoom configurations. A workaround existed but
was removed because it caused minor bugs on other browsers.

## Developing

Install dependencies with `pnpm install` (or `npm install` or `yarn`), then
start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```bash
npm run package
```

