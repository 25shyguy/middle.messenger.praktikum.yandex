export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export class EventBus<E extends string = string, M extends { [K in E]: unknown[] } = Record<E, any[]>> {
    public listeners: { [key in E]?: Listener<M[E]>[] } = {}
    constructor() {
        this.listeners = {};
    }

    public on(event: E, callback: Listener<M[E]>) {
        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]!.push(callback);
    }

    public off(event: E, callback: Listener<M[E]>) {
        if(!this.listeners[event]) {
            throw new Error(`event: ${event} is not exist`);
        }

        this.listeners[event] = this.listeners[event]!.filter(
            (listener) => listener !== callback)
    }

    public emit(event: E, ...args: M[E]) {
        if(!this.listeners[event]) {
            throw new Error(`event: ${event} is not exist`);
        }

        this.listeners[event]!.forEach((listener) => {
            listener(...args)
        })
    }
}
