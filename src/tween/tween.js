/**
 * 参考 TweenJS 实现
 */
import {clone, isUndefined} from "../base/util";

class Tween {
    constructor(target) {
        this._target = target;
        this._currentProps = {};
        this._initProps = {};
        this._steps = [];
        this._actions = [];
        this._paused = false;
    }

    tick() {
        if(this._paused) {
            return;
        }
    }

    wait(duration) {
        this._addStep({
            d : duration,
            p0: clone(this._currentProps),
            e : '',
            p1: clone(this._currentProps)
        });
    }

    to(props, duration, ease) {
        this._addStep({
            d : duration,
            p0: clone(this._currentProps),
            e : ease,
            p1: clone(this._appendProps(props))
        });
    }

    _appendProps(props) {
        for(let key in props) {
            if(isUndefined(this._initProps[key])) {
                this._initProps[key] = this._target[key];
            }
            this._currentProps[key] = props[key];
        }
    }

    _addStep(o) {
        if (o.d > 0) {
            this._steps.push(o);
            o.t = this._duration;
            this._duration += o.d;
        }
    }

}

export default Tween
