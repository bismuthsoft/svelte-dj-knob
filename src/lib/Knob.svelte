<script>
 let val = 50;
 let min = 0;
 let max = 100;
 function clamp (a, b, c) {
     return Math.min(Math.max(a, b), c);
 }
 function dragAction(elem) {
     function mouseDown() {
         elem.requestPointerLock();
     }
     function mouseMove(event) {
         val = clamp(min, val-event.movementY, max);
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
         }
     }
 }
</script>

<div class="knob" use:dragAction>
    <div>{val}</div>
</div>

<style>
 .knob {
     height: 6rem;
     width: 6rem;
     font-size: 2rem;
     user-select: none;
     background: black;
     color: white;
     display: grid;
     place-items: center;
     border-radius: 50%;
 }
</style>
