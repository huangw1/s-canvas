import EventDispatcher from "../base/event-dispatcher";
import UID from "../base/uid";
import Matrix2D from "../base/matrix2d";
import Stage from "../core/stage";

/**
 * DisplayObject is a abstract class.
 * It defines the core properties and methods that are shared between all display objects.
 */
class DisplayObject extends EventDispatcher {
    constructor(props) {
        super(props);

        this.id = UID.get();

        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.originX = 0;
        this.originY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.skewX = 0;
        this.skewY = 0;

        this.alpha = 1;
        this.visible = true;

        this.fixed = false;

        this.matrix = Matrix2D.initializeWithDefault();
        this.hitMatrix = Matrix2D.initializeWithDefault();
    }

    get isVisible() {
        return this.visible === false || this.alpha === 0;
    }

    get scale() {
        return this.scaleX;
    }

    set scale(val) {
        this.scaleX = this.scaleY = val;
    }

    get stage() {
        let target = this;
        while(target.parent) {
            target = target.parent;
        }
        if(target instanceof Stage) {
            return target;
        }
    }

    setTransform(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
        this.x = x || 0;
        this.y = y || 0;
        this.scaleX = scaleX || 1;
        this.scaleY = scaleY || 1;
        this.rotation = rotation || 0;
        this.skewX = skewX || 0;
        this.skewY = skewY || 0;
        this.originX = originX || 0;
        this.originY = originY || 0;
    }

    clone() {
        console.log('not yet implement.');
    }

    destroy() {
        this.parent.remove(this);
    }
}

export default DisplayObject
