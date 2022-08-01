const defaultTotals = () => ({
    movementX: 0,
    movementY: 0,
});

interface MovementI {
    movementX: number;
    movementY: number;
}

export interface OptionsI {
    originFix?: boolean,
    lockCursor?: boolean,
}

const defaultOptions: Readonly<OptionsI> = {
    originFix: false,
    lockCursor: true,
};

export type LockDragEvent = CustomEvent<MovementI>;

export default function lockDrag(elem: HTMLElement, options: OptionsI) {
    options = {...defaultOptions, ...options};
    const actions = [
        pointercapture(elem),
        ...(options.lockCursor ? [pointerlock(elem)] : []),
    ];
    return {
        destroy() {
            actions.forEach(action => action.destroy());
        },
        update(newOptions: OptionsI) {
            options = newOptions;
        }
    }
}


function stopPropagation(event: Event) {
    event.stopPropagation();
}
function preventDefault(event: Event) {
    event.preventDefault();
}

export function pointerlock(elem: HTMLElement) {
    function documentPointerMove(event: PointerEvent) {
        elem.dispatchEvent(new MouseEvent(event.type, event));
    }
    function enterLock() { elem.requestPointerLock(); }
    function exitLock() { document.exitPointerLock(); }
    function lockChange() {
        if(document.pointerLockElement === elem) {
            document.addEventListener('pointermove', documentPointerMove);
            elem.addEventListener('pointermove', stopPropagation);
        } else {
            document.removeEventListener('pointermove', documentPointerMove);
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

export function pointercapture(elem: HTMLElement) {
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
