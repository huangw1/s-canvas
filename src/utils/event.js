import {noop} from "./index";

// sub pub
export class EventBus {

    events = [];

    on(event, callback = noop) {
        const es = event.split(' ');
        es.forEach((e) => {
            this.events.push({
                eventType: e,
                callback
            });
        });
        return this;
    }

    emit(event, ...params) {
        this.events
            .filter(e => e.eventType === event)
            .forEach(e => e.callback(...params));
    }
}

// keyboard press
export class KeyPress extends EventBus {

    events = [];

    constructor() {
        super();
    }

    keyPressed(e) {
        let key = '';
        switch (e.keyCode) {
            case 32:
                key = 'space';
                break;
            case 37:
                key = 'left';
                break;
            case 39:
                key = 'right';
                break;
            case 38:
                key = 'up';
                break;
            case 40:
                key = 'down';
                break;
        }
        this.emit(key);
    }
}