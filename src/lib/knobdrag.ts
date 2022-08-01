import lockdrag from './lockdrag';
import type { OptionsI } from './lockdrag';
import type { LockDragEvent } from './lockdrag.js';
import type { Writable } from 'svelte/store';

interface Options {
    min: number,
    max: number,
    step: number,
    value: Writable<number>,
    options: OptionsI, // TODO make this a global store
};

export default function knobdrag(elem: HTMLElement | SVGElement, options: Options) {
    const { destroy, update } = lockdrag(elem, options.options);
    function clamp(a: number, b: number, c: number): number {
        return Math.min(Math.max(a, b), c);
    }
    function knobMove(event: PointerEvent) {
        const {movementY, pointerId} = event;
        if (movementY && elem.hasPointerCapture(pointerId) || document.pointerLockElement === elem) {
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
    elem.addEventListener("pointermove", knobMove);
    elem.addEventListener("lockdragrelease", knobRelease);

    return {
        destroy() {
            destroy();
        },
        update(newOptions: Options) {
            update(newOptions.options)
            options = newOptions;
        }
    }
}
