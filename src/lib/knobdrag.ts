import { onDestroy } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import type { ActionReturn } from 'svelte/action';
import options from './options.js';

export interface KnobDragParams {
	min: number;
	max: number;
	step: number;
	inputElem?: HTMLInputElement;
	valueStore?: Writable<number>;
	getValue?: () => number;
	setValue?: (value: number) => void;
}

function hasCapture(pointerId: number, elem: Element) {
	return elem.hasPointerCapture(pointerId) || document.pointerLockElement === elem;
}

export default function knobdrag(
	elem: HTMLElement | SVGElement,
	params: KnobDragParams
): ActionReturn<KnobDragParams> {
	const actions = new Map<string, { destroy: () => void }>();
	actions.set('pointercapture', pointercapture(elem));

	const unsubscribeOptions = options.subscribe(($options) => {
		actions.get('pointerlock')?.destroy();
		if ($options.lockCursor) {
			actions.set('pointerlock', pointerlock(elem));
		} else {
			actions.delete('pointerlock');
		}
	});

	let moved = false;

	function knobMove(event: Event): void {
		const { movementY, pointerId } = event as PointerEvent;
		if (movementY && hasCapture(pointerId, elem)) {
			if (params.valueStore) {
				params.valueStore.update((value) => {
					moved = true;
					return clamp(params.min, value - movementY * params.step, params.max);
				});
			} else if (params.getValue && params.setValue) {
				moved = true;
				const nextValue = clamp(
					params.min,
					params.getValue() - movementY * params.step,
					params.max
				);
				params.setValue(nextValue);
			}
		}
	}

	function knobRelease(): void {
		if (moved === false) {
			params.inputElem?.select();
		}
		moved = false;
	}

	elem.addEventListener('pointermove', knobMove);
	elem.addEventListener('pointerup', knobRelease);

	return {
		destroy() {
			unsubscribeOptions();
			actions.forEach((action) => action.destroy());
			elem.removeEventListener('pointermove', knobMove);
			elem.removeEventListener('pointerup', knobRelease);
		},
		update(newParams: KnobDragParams) {
			params = newParams;
		}
	};
}

export function makeValueStore(value: number, update: (v: number) => void) {
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

function pointerlock(elem: HTMLElement | SVGElement) {
	function enterLock(event: Event) {
		if ((event as MouseEvent).button !== 2) {
			Promise.resolve(elem.requestPointerLock?.()).catch(() => {});
		}
	}
	function exitLock() {
		if (document.pointerLockElement === elem) {
			document.exitPointerLock();
		}
	}
	function lockChange() {
		if (document.pointerLockElement === elem) {
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
			elem.removeEventListener('pointermove', stopPropagation);
		}
	};
}

function pointercapture(elem: HTMLElement | SVGElement) {
	function pointerDown(event: Event) {
		const pointerEvent = event as PointerEvent;
		if (pointerEvent.button !== 2) {
			elem.setPointerCapture(pointerEvent.pointerId);
		}
	}
	elem.addEventListener('pointerdown', pointerDown);
	elem.addEventListener('touchmove', preventDefault);
	return {
		destroy() {
			elem.removeEventListener('pointerdown', pointerDown);
			elem.removeEventListener('touchmove', preventDefault);
		}
	};
}

function clamp(a: number, b: number, c: number): number {
	return Math.min(Math.max(a, b), c);
}
