/**
 * wrapper event
 */
class BrowserEvent {
    constructor() {
        this.propagationStopped = false;
        this.stageX = null;
        this.stageY = null;
        this.pureEvent = null;
    }

    preventDefault() {
        this.pureEvent.preventDefault();
    }

    stopPropagation() {
        this.propagationStopped = true;
    }
}

export default BrowserEvent
