class Totals {
    constructor() {
        this.reset();
    }
    reset() {
        this.movementX = 0;
        this.movementY = 0;
    }
    add(other) {
        Object.keys(this).forEach(key => {
            this[key] += other[key];
        });
    }
}
export default function lockDrag(elem) {
    const totals = new Totals();
    function pointerDown() {
        elem.requestPointerLock();
    }
    function pointerMove(event) {
        const { movementY, movementX } = event;
        const detail = { movementY, movementX };
        elem.dispatchEvent(new CustomEvent("lockdrag", { detail }));
        totals.add(detail);
    }
    function pointerUp() {
        document.removeEventListener('pointerup', pointerUp);
        document.exitPointerLock();
        elem.dispatchEvent(new CustomEvent("lockdragrelease", { detail: totals }));
        totals.reset();
    }
    function pointerLockChange() {
        if(document.pointerLockElement === elem) {
            document.addEventListener('pointermove', pointerMove);
            document.addEventListener('pointerup', pointerUp);
        } else {
            document.removeEventListener('pointermove', pointerMove);
        }
    }
    elem.addEventListener('pointerdown', pointerDown);
    document.addEventListener('pointerlockchange', pointerLockChange);
    return {
        destroy() {
            elem.removeEventListener('pointerdown', pointerDown);
            document.removeEventListener('pointerlockchange', pointerLockChange);
        }
    }
}
