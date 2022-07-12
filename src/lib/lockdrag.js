const defaultTotals = () => ({
    movementX: 0,
    movementY: 0,
});
export default function lockDrag(elem, options = {
    originFix: false,
}) {
    let totals = defaultTotals();
    let origin;
    function pointerDown() {
        elem.requestPointerLock();
    }
    function pointerMove(event) {
        let { movementX, movementY } = event;
        // For some reason firefox on some systems has an origin of -1 -1
        // instead of 0 0. This hack assumes the first frame of pointermove is
        // the origin. An implication of this hack is if the element is clicked
        // with velocity the pointer continues to move in that direction.
        //
        // Possibly related issue: https://github.com/w3c/pointerlock/issues/42
        if (options.originFix) {
            origin ??= { movementX, movementY };
            movementX -= origin.movementX;
            movementY -= origin.movementY;
        }
        const detail = { movementX, movementY };
        elem.dispatchEvent(new CustomEvent("lockdrag", { detail }));
        totals.movementX += detail.movementX;
        totals.movementY += detail.movementY;
    }
    function pointerUp() {
        origin = undefined;
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
        },
        update(newOpts) {
            options = newOpts;
        }
    }
}
