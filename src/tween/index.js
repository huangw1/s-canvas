import * as easing from './easing';
import {noop} from "../utils";

class Tween {

    constructor(props) {
        const {
            from,
            to,
            duration = 500,
            delay = 0,
            easing = 'linear',
            onStart = noop,
            onUpdate = noop,
            onFinish = noop
        } = props;

        for (let key in from) {
            if (to[key] === undefined) {
                to[key] = from[key];
            }
        }
        for (let key in to) {
            if (from[key] === undefined) {
                from[key] = to[key];
            }
        }

        Object.assign(this, {
            from,
            to,
            duration,
            delay,
            easing,
            onStart,
            onUpdate,
            onFinish,
            startTime: Date.now() + delay,
            elapsed  : 0,
            started  : false,
            finished : false
        })
    }

    update() {
        const keys = {};
        const now = Date.now();
        if (now < this.startTime) {
            return;
        }

        if (this.elapsed >= this.duration) {
            if (!this.finished) {
                this.finished = true;
                this.onFinish(keys);
            }
            return;
        }

        this.elapsed = now - this.startTime;
        if(this.elapsed > this.duration) {
            this.elapsed = this.duration;
        }

        for (let key in this.to) {
            keys[key] = this.from[key] + (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
        }

        if(!this.started) {
            this.started = true;
            this.onStart(keys);
        }

        this.onUpdate(keys);
    }
}

export default Tween
