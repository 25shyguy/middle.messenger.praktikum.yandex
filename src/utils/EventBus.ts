export class EventBus {
    private listeners: Record<string, Array<() => void>> = {}
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if(!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event, callback) {
        if(!this.listeners[event]) {
            throw new Error(`event: ${event} is not exist`);
        }

        this.listeners[event] = this.listeners[event]!.filter(
            (listener) => listener !== callback)
    }

    emit(event, ...args) {
        if(!this.listeners[event]) {
            throw new Error(`event: ${event} is not exist`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args)
        })
    }
}
