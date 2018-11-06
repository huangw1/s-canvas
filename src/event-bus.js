import {noop} from "./utils";
import {EVENT_TYPES} from "./utils/consts";

class EventBus {

    events = [];

    on(event, callback = noop) {
        const es = event.split(' ');
        es.forEach((e) => {
            if (EVENT_TYPES.find(event => event === e)) {
                this.events.push({
                    eventType: e,
                    callback
                });
            } else {
                console.warn(`${e} is not in EVENT_TYPES`);
            }
        });
        return this;
    }

    emit(event, ...params) {
        this.events
            .filter(e => e.eventType === event)
            .forEach(e => e.callback(...params));
    }
}

export default EventBus