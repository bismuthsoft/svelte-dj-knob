import { onDestroy } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import options from './options.js';

interface Params {
    min: number,
    max: number,
    step: number,
    valueStore: Writable<number>,
    inputElem: HTMLInputElement,
}

function hasCapture(pointerId: number, elem: HTMLElement) {
    return elem.hasPointerCapture(pointerId) ||
        document.pointerLockElement === elem;
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
    let moved = false;
    function knobMove(event: PointerEvent): void {
        const { movementY, pointerId } = event;
        if (movementY && hasCapture(pointerId, elem)) {
            params.valueStore.update(value => {
                moved = true;
                return clamp(
                    params.min,
                    value - (movementY * params.step),
                    params.max
                );
            });
        }
    }
    function knobRelease(_event: PointerEvent): void {
        if (moved === false) {
            params.inputElem.select();
        }
        moved = false;
    }
    elem.addEventListener("pointermove", knobMove);
    elem.addEventListener("pointerup", knobRelease);
    return {
        destroy() {
            actions.forEach(action => action.destroy());
            elem.removeEventListener("pointermove", knobMove);
            elem.removeEventListener("pointerup", knobMove);
        },
        update(newParams: Params) {
            params = newParams;
        }
    }
}

export function makeValueStore(value: number, update: (v: number)=>void) {
    const valueStore = writable(value);
    onDestroy(valueStore.subscribe(update));
    return valueStore;
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
