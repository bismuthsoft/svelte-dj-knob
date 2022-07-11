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
    function mouseDown() {
        elem.requestPointerLock();
    }
    function mouseMove(event) {
        const { movementY, movementX } = event;
        const detail = { movementY, movementX };
        elem.dispatchEvent(new CustomEvent("lockdrag", { detail }));
        totals.add(detail);
    }
    function mouseUp() {
        document.removeEventListener('mouseup', mouseUp);
        document.exitPointerLock();
        elem.dispatchEvent(new CustomEvent("lockdragrelease", { detail: totals }));
        totals.reset();
    }
    function pointerLockChange() {
        if(document.pointerLockElement === elem) {
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);
        } else {
            document.removeEventListener('mousemove', mouseMove);
        }
    }
    elem.addEventListener('mousedown', mouseDown);
    document.addEventListener('pointerlockchange', pointerLockChange);
    return {
        destroy() {
            elem.removeEventListener('mousedown', mouseDown);
            document.removeEventListener('pointerlockchange', pointerLockChange);
        }
    }
}
