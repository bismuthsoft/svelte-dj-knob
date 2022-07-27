import type { LockDragEvent } from './lib/lockdrag.js';

declare namespace svelte.JSX {
    type EventHandler<E extends Event = Event, T extends EventTarget = HTMLElement> =
      (event: E & { currentTarget: EventTarget & T}) => any;

    interface DOMAttributes<T extends EventTarget> {
        onlockdrag?: EventHandler<LockDragevent, Element>;
        onlockdragrelease?: EventHandler<LockDragevent, Element>;
    }
}
