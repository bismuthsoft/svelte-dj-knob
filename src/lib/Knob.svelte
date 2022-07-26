<script lang="ts">
 import type { LockDragEvent } from './lockdrag.js';
 import lockdrag from '$lib/lockdrag.js';
 export let min = 0;
 export let max = 100;
 export let step = (min + max) / 100;
 export let value = 50;
 export let size = '5rem';
 export let textColor = '';
 export let options = {};
 export let label = '';
 let inputElem: HTMLElement;
 function clamp(a: number, b: number, c: number): number {
     return Math.min(Math.max(a, b), c);
 }
 function knobMove(event: LockDragEvent) {
     const movementY: number = event.detail.movementY;
     if (movementY) {
         value = clamp(min, value - (movementY*step), max);
     }
 }
 function knobRelease({detail: { movementY }}: LockDragEvent) {
     if (movementY === 0) {
         inputElem.focus();
     }
 }

 const radius = 50;
 const margin = radius * 0.2;
 const circumfrence = 0.8;
 const innerRadius = radius - margin;

 const tickLabelWidth = radius * 0.35;
 const minTickLabel = { x: tickLabelWidth, y: radius*1.8 };
 const maxTickLabel = { x: radius*2 - tickLabelWidth, y: radius*1.8 };

 function angleOnKnob (position: number) {
     const bottomAngle = -Math.PI / 2.0;
     const leastAngle = bottomAngle - (Math.PI * circumfrence);
     const mostAngle = bottomAngle + (Math.PI * circumfrence);
     return leastAngle + position * (mostAngle-leastAngle)
 }

 function pointOnKnob (position: number, rad: number = radius) {
     const angle = angleOnKnob(position);
     const out = {x: Math.cos(angle)*rad + radius, y: Math.sin(angle)*rad + radius};
     return out;
 }

 const numTicks = 9;
 const outerTicks = Array(numTicks).fill(0).map((_, x) =>
     [pointOnKnob(x/(numTicks-1), innerRadius), pointOnKnob(x/(numTicks-1), radius*0.95)]
 );

 $: rangePos = value / (max - min) - min;
 $: pointer = [pointOnKnob(rangePos, innerRadius*0.8), pointOnKnob(rangePos, innerRadius*0.3)];
</script>

<div class="knobber"
     use:lockdrag="{options}"
     on:lockdrag="{knobMove}"
     on:lockdragrelease="{knobRelease}">
    <div class="knob">
        <div>
            <svg viewBox="{-radius*.1} 0 {radius*2.2} {radius*2}"
                 height="{size}">
                {#each outerTicks as tick}
                    <line x1="{tick[0].x}" y1="{tick[0].y}"
                          x2="{tick[1].x}" y2="{tick[1].y}"
                          stroke="#aaa"
                          stroke-width="3"
                    />
                {/each}
                <circle cx="{radius}" cy="{radius}" r="{innerRadius}"
                        stroke="white" stroke-width="4" fill="black"/>
                <line x1="{pointer[0].x}" y1="{pointer[0].y}"
                      x2="{pointer[1].x}" y2="{pointer[1].y}"
                      stroke="red"
                      stroke-width="6"
                      stroke-linecap="round"
                />
                <text class="tickLabel"
                      fill="{textColor}"
                      {...minTickLabel}
                      inline-size="{tickLabelWidth}"
                      text-anchor="end">
                    {min}
                </text>
                <text class="tickLabel"
                      fill="{textColor}"
                      {...maxTickLabel}
                      inline-size="{tickLabelWidth}"
                      text-anchor="start">
                    {max}
                </text>
            </svg>
            <span style="color:{textColor}; font-size:calc({size} / 5);">
                {label}
            </span>
        </div>
    </div>
    <input type="text"
           bind:this="{inputElem}"
           on:change="{e => value = e.target.value}"
           {value}

    />
</div>

<style>
 .knobber {
     user-select: none;
     display: inline-grid;
     place-items: center;
 }
 .knob {
     grid-area: 1/1/1/1;
 }
 input {
     grid-area: 1/1/1/1;
     z-index: 5;
     user-select: none;
     pointer-events: none;
     font-size: 2rem;
     width: 2em;
     text-align: center;
     background: #0000;
     color: #0000;
     border: none;
 }
 input:focus {
     color: white;
 }
 div {
     display: flex;
     flex-direction: column;
 }
 span {
     position: relative;
     top: -.4em;
     text-align: center;
 }
 .tickLabel {
     position: absolute;
     font-size: 10px;
 }
</style>
