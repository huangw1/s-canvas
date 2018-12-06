/**
 * wrapper event
 */
class Event {
    constructor() {
        this.propagationStopped = false;
        this.stageX = null;
        this.stageX = null;
        this.pureEvent = null;
    }

    preventDefault() {
        this.pureEvent.preventDefault();
    }

    stopPropagation() {
        this.propagationStopped = true;
    }
}

export default Event
