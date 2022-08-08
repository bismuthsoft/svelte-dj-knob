<script lang="ts">
 export let value = 50;
 export let label = '';
 export let min = 0;
 export let max = 100;
 export let size = "5rem";
 export let textColor = '';

 $: normValue = (value - min) / (max - min);

 const knobSize = 0.8; // Size of knob in element (compared to ticks)
 const tickLabelWidth = 0.35;
 const arcLength = Math.PI * 0.8; // How far around the circle

 const minTickLabel = { x: tickLabelWidth, y: 1.8 };
 const maxTickLabel = { x: 2 - tickLabelWidth, y: 1.8 };

 // Position 0-1 to give an angle in radians
 function angleOnKnob (position: number) {
     const leastAngle = -Math.PI / 2.0 - arcLength;
     return leastAngle + position * arcLength * 2;
 }

 // Position 0-1 corresponds with an angle, rad is the distance from the center
 function pointOnKnob (position: number, rad: number = 1) {
     const angle = angleOnKnob(position);
     const out = {x: Math.cos(angle)*rad + 1, y: Math.sin(angle)*rad + 1};
     return out;
 }

 const numTicks = 10;
 const outerTicks = Array(numTicks).fill(0).map((_, x) =>
     [pointOnKnob(x/(numTicks-1), 0.88), pointOnKnob(x/(numTicks-1), 0.92)]
 );
</script>

<div>
    <svg viewBox="-0.1 0 2.2 2"
         height="{size}">
        {#each outerTicks as tick}
            <line x1="{tick[0].x}" y1="{tick[0].y}"
                  x2="{tick[1].x}" y2="{tick[1].y}"
                  stroke="#fff"
                  stroke-width="0.05"
                  stroke-linecap="round"
            />
        {/each}
        <circle cx=1 cy=1 r="{knobSize}"
                fill="white"/>
        <polygon transform="rotate({angleOnKnob(normValue) * 360 / Math.PI / 2.0} 1 1)"
                 points="1,0.7 {1+knobSize},1.0 1,1.3"
                 fill="#0044ee"
        />
        <circle cx=1 cy=1 r="{0.3}"
                fill="white"/>
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

<style>
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
     font-size: 0.2px;
 }
</style>
