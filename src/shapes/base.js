import { EventBus } from "../utils/event";

class Base extends EventBus {

    constructor(settings) {
        super();

        Object.assign(this, {
            zIndex           : 0,
            moveX            : 0,
            moveY            : 0,
            fixed            : false,
            isDragging       : false,
            enableDrag       : false,
            hasEnter         : false,
            hasDragIn        : false,
            enableChangeIndex: false,
        }, settings);
    }

    config(setting) {
        Object.assign(this, setting);
        return this;
    }
}

export default Base