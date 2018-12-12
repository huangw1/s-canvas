import * as easing from './easing';
import {noop} from "../base/util";

class Tween {
    constructor(cmdConfigurations) {
        this.current = 0;
        this.cmdConfigurations = cmdConfigurations;
        this.cmdConfiguration = this.getCmdConfiguration();
    }

    get hasFinished() {
        return this.current > this.cmdConfigurations.length - 1;
    }

    getCmdConfiguration() {
        const cmdConfigurations = this.cmdConfigurations;
        const cmdConfiguration = cmdConfigurations[this.current];
        const {
            from,
            to,
            duration = 500,
            delay = 0,
            easing = 'linear',
            start = noop,
            update = noop,
            finish = noop
        } = cmdConfiguration;

        if(this.current) {
            const prevCmdConfiguration = cmdConfigurations[this.current - 1];
            // 使用上一段属性
            for (let key in from) {
                from[key] = prevCmdConfiguration.properties[key] || from[key];
            }
        }

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

        Object.assign(cmdConfiguration, {
            from,
            to,
            duration,
            delay,
            easing,
            start,
            update,
            finish,
            startTime : new Date().getTime() + delay,
            elapsed   : 0,
            started   : false,
            finished  : false,
            properties: {}
        });
        return cmdConfiguration;
    }

    compute() {
        if(this.hasFinished) {
            return;
        }
        if(!this.cmdConfiguration) {
            this.cmdConfiguration = this.getCmdConfiguration();
        }
        const cmdConfiguration = this.cmdConfiguration;

        const timeStamp = new Date().getTime();
        if (timeStamp < cmdConfiguration.startTime) {
            return;
        }
        if (cmdConfiguration.elapsed >= cmdConfiguration.duration) {
            if (!cmdConfiguration.finished) {
                cmdConfiguration.finished = true;
                cmdConfiguration.finish(cmdConfiguration.properties);
                // 执行下一段
                this.current += 1;
                this.cmdConfiguration = undefined;
            }
            return;
        }

        cmdConfiguration.elapsed = timeStamp - cmdConfiguration.startTime;
        if(cmdConfiguration.elapsed > cmdConfiguration.duration) {
            cmdConfiguration.elapsed = cmdConfiguration.duration;
        }

        for (let key in cmdConfiguration.to) {
            const easingFunc = easing[cmdConfiguration.easing];
            const ratio = cmdConfiguration.elapsed / cmdConfiguration.duration;
            const diff = cmdConfiguration.to[key] - cmdConfiguration.from[key];
            cmdConfiguration.properties[key] = cmdConfiguration.from[key] + diff * easingFunc(ratio);
        }

        if(!cmdConfiguration.started) {
            cmdConfiguration.started = true;
            cmdConfiguration.start(cmdConfiguration.properties);
        }

        cmdConfiguration.update(cmdConfiguration.properties);
    }
}

export default Tween
