export default function lockDrag(elem, cb) {
    function mouseDown() {
        elem.requestPointerLock();
    }
    function mouseMove(event) {
        cb(-event.movementY);
    }
    function mouseUp() {
        document.removeEventListener('mouseup', mouseUp);
        document.exitPointerLock();
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
        },
        update(newCb) {
            cb = newCb;
        }
    }
}
