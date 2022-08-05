import type { Writable } from 'svelte/store';
import options from './options.js';

interface Params {
    min: number,
    max: number,
    step: number,
    value: Writable<number>,
}

export default function knobdrag(elem: HTMLElement, params: Params) {
    const actions = new Map();
    actions.set('pointercapture', pointercapture(elem));
    options.subscribe($options => {
        actions.get('pointerlock')?.destroy();
        if ($options.lockCursor) {
            actions.set('pointerlock', pointerlock(elem));
        } else {
            actions.delete('pointerlock');
        }
    });
    function knobMove(event: PointerEvent): void {
        const { movementY, pointerId } = event;
        if (movementY && elem.hasPointerCapture(pointerId) || document.pointerLockElement === elem) {
            params.value.update(value => (
                clamp(params.min, value - (movementY * params.step), params.max)
            ));
        }
    }
    elem.addEventListener("pointermove", knobMove);
    return {
        destroy() {
            actions.forEach(action => action.destroy());
            elem.removeEventListener("pointermove", knobMove);
        },
    }
}

function stopPropagation(event: Event) {
    event.stopPropagation();
}
function preventDefault(event: Event) {
    event.preventDefault();
}

function pointerlock(elem: HTMLElement) {
    function enterLock() {
        elem.requestPointerLock();
    }
    function exitLock() {
        document.exitPointerLock();
    }
    function lockChange() {
        if(document.pointerLockElement === elem) {
            elem.addEventListener('pointermove', stopPropagation);
        } else {
            elem.removeEventListener('pointermove', stopPropagation);
        }
    }
    elem.addEventListener('mousedown', enterLock);
    elem.addEventListener('mouseup', exitLock);
    document.addEventListener('pointerlockchange', lockChange);
    return {
        destroy() {
            elem.removeEventListener('mousedown', enterLock);
            elem.removeEventListener('mouseup', exitLock);
            document.removeEventListener('pointerlockchange', lockChange);
        }
    }
}

function pointercapture(elem: HTMLElement) {
    function pointerDown(event: PointerEvent) {
        elem.setPointerCapture(event.pointerId);
    }
    elem.addEventListener('pointerdown', pointerDown);
    elem.addEventListener('touchmove', preventDefault);
    return {
        destroy() {
            elem.removeEventListener('pointerdown', pointerDown);
            elem.removeEventListener('touchmove', preventDefault);
        }
    }
}

function clamp(a: number, b: number, c: number): number {
    return Math.min(Math.max(a, b), c);
}
