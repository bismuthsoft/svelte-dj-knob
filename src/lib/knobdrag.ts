import lockdrag from './lockdrag';
import type { LockDragEvent } from './lockdrag.js';
import type { Writable } from 'svelte/store';

interface Options {
    min: number,
    max: number,
    step: number,
    value: Writable<number>,
};

export default function knobdrag(elem: HTMLElement, options: Options) {
    const { destroy, update } = lockdrag(elem, {/*TODO*/});
    function clamp(a: number, b: number, c: number): number {
        return Math.min(Math.max(a, b), c);
    }
    function knobMove(event: LockDragEvent) {
        const movementY: number = event.detail.movementY;
        if (movementY) {
            options.value.update(value => (
                clamp(options.min, value - (movementY*options.step), options.max)
            ));
        }
    }
    function knobRelease({detail: { movementY }}: LockDragEvent) {
        if (movementY === 0) {
            //inputElem.focus();
        }
    }
    elem.addEventListener("lockdrag", knobMove);
    elem.addEventListener("lockdragrelease", knobRelease);

    return {
        destroy() {
            destroy();
        },
        update(val: Options) {
            // TODO
            //update(val);
        }
    }
}
