const defaultTotals = () => ({
    movementX: 0,
    movementY: 0,
});
export default function lockDrag(elem) {
    let totals = defaultTotals();
    function pointerDown() {
        elem.requestPointerLock();
    }
    function pointerMove(event) {
        let { movementY, movementX } = event;
        let detail = { movementY, movementX };
        elem.dispatchEvent(new CustomEvent("lockdrag", { detail }));
        totals.movementX += movementX;
        totals.movementY += movementY;
    }
    function pointerUp() {
        document.removeEventListener('pointerup', pointerUp);
        document.exitPointerLock();
        elem.dispatchEvent(new CustomEvent("lockdragrelease", { detail: totals }));
        totals = defaultTotals();
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
