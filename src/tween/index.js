import * as easing from './easing';
import {noop} from "../base/util";

class Tween {
    constructor(props) {
        const {
            from,
            to,
            duration = 500,
            delay = 0,
            easing = 'linear',
            start = noop,
            update = noop,
            finish = noop
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

        this.from = from;
        this.to = to;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
        this.start = start;
        this.update = update;
        this.finish = finish;
        this.startTime = new Date().getTime() + delay;
        this.elapsed = 0;
        this.started = false;
        this.finished = false;
    }

    compute() {
        const properties = {};
        const timeStamp = new Date().getTime();
        if (timeStamp < this.startTime) {
            return;
        }

        if (this.elapsed >= this.duration) {
            if (!this.finished) {
                this.finished = true;
                this.finish(properties);
            }
            return;
        }

        this.elapsed = timeStamp - this.startTime;
        if(this.elapsed > this.duration) {
            this.elapsed = this.duration;
        }

        for (let key in this.to) {
            properties[key] = this.from[key] + (this.to[key] - this.from[key]) * easing[this.easing](this.elapsed / this.duration);
        }

        if(!this.started) {
            this.started = true;
            this.start(properties);
        }

        this.update(properties);
    }
}

export default Tween
