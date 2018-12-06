import { EventBus } from "../utils/event";
import {noop} from "../utils";
import Tween from "../tween";

class Geometry extends EventBus {

    bound = undefined;

    constructor(settings) {
        super();

        Object.assign(this, {
            zIndex           : 0,
            moveX            : 0,
            moveY            : 0,
            rotate           : 0,
            fixed            : false,
            isDragging       : false,
            isAnimating      : false,
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

    animateTo(keys, config = {}) {
        Object.assign(config, {
            from: {},
            to  : keys
        })

        for(let key in keys) {
            config.from[key] = this[key];
        }
        const onStart = config.onStart || noop;
        config.onStart = () => {
            this.isAnimating = true;
            onStart();
        };
        const onUpdate = config.onUpdate || noop;
        config.onUpdate = (props) => {
            Object.assign(this, props);
            onUpdate(props);
        };
        const onFinish = config.onFinish || noop;
        config.onFinish = () => {
            this.isAnimating = false;
            onFinish();
        };

        const tween = new Tween(config);
        this.sc.animate(tween);

    }

    move (x = 0, y = 0) {

    }

    scale(scale = 1) {

    }

    clone() {

    }
}

export default Geometry
