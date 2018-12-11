/**
 * Ticker for animation.
 */
import UID from "../base/uid";

let ticking = false;
const queue = [];

export const untick = (uid) => {
    const index = queue.findIndex(item => item.uid === uid);
    queue.splice(index, 1);
    if (!queue.length) {
        ticking = false;
    }
};

export const tick = (callback, interval) => {
    const uid = UID.get();
    queue.push({
        uid,
        callback,
        interval,
        lastTime: new Date().getTime(),
    });

    if(!ticking) {
        const requestFunc = () => {
            queue.forEach(item => {
                if(!item.interval) {
                    item.callback();
                } else if((new Date().getTime()) - item.lastTime >= item.interval) {
                    item.callback();
                    item.lastTime = new Date().getTime();
                }
            });
            if(ticking) {
                requestAnimationFrame(requestFunc);
            }
        };
        ticking = true;
        requestFunc();
    }
    return () => {
        untick(uid)
    };
};




