import EventDispatcher from "../base/event-dispatcher";
import UID from "../base/uid";
import Matrix2D from "../base/matrix2d";
import {noop} from "../base/util";
import Tween from "../tween";
import Bound from "../base/bound";

/**
 * todo: 缓存 bound，matrix 等，只在属性变化时更新
 * DisplayObject is a abstract class.
 * It defines the core properties and methods that are shared between all display objects.
 */
class DisplayObject extends EventDispatcher {
    constructor() {
        super();

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

        this.bound = null;

        this.clipGraphic = null;

        this.compositeOperation = null;
        this.shadow = null;

        this.matrix = Matrix2D.new();
    }

    get isVisible() {
        if(!this.visible) {
            return false;
        }
        if(this.alpha === 0) {
            return false;
        }
        return true;
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
        if(target.name === 'Stage') {
            return target;
        }
    }

    getAlpha() {
        let current = this;
        let alpha = this.alpha;
        while (current.parent) {
            alpha *= current.parent.alpha;
            current = current.parent;
        }
        return alpha;
    }

    getCompositeOperation() {
        let current = this;
        while (current) {
            if(current.compositeOperation) {
                return current.compositeOperation;
            } else {
                current = current.parent;
            }
        }
    }

    getShadow() {
        let current = this;
        while (current) {
            if(current.shadow) {
                return current.shadow;
            } else {
                current = current.parent;
            }
        }
    }

    clip(graphic) {
        this.clipGraphic = graphic;
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

    getMatrix() {
        const {x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY} = this;
        return Matrix2D.reset(this.matrix) && Matrix2D.appendTransform(this.matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY);
    }

    /**
     * the combined transform all of its parent.
     */
    getConcatenatedMatrix() {
        let matrixList = [];
        let current = this;
        while (current) {
            if(current.fixed) {
                matrixList.unshift(Matrix2D.new());
            } else {
                matrixList.unshift(Matrix2D.copy(current.getMatrix()));
            }
            current = current.parent;
        }
        return matrixList.reduce((matrix, next) => {
            return Matrix2D.multiply(matrix, next);
        }, Matrix2D.new())
    }

    /**
     * calculate transformedBounds
     */
    setBounds(x, y, width, height) {
        if(!this.bound) {
            this.bound = new Bound();
        }
        this.bound.setBounds(x, y, width, height);
    }

    getBounds() {
        return this.bound && this.bound.getBounds();
    }

    /**
     * bounds applying transform.
     */
    getTransformedBounds() {
        return this._transformBounds(this.bound);
    }

    _transformBounds(bound, matrix) {
        let transformMatrix = Matrix2D.new();
        matrix = matrix || this.getConcatenatedMatrix();
        const {x, y} = bound.getBounds();
        if(x || y) {
            Matrix2D.translate(transformMatrix, -x, -y);
        }
        Matrix2D.multiply(transformMatrix, matrix);
        let {lt, rt, lb, rb} = bound.getPoints();
        lt = Matrix2D.transform2Point(transformMatrix, lt);
        rt = Matrix2D.transform2Point(transformMatrix, rt);
        lb = Matrix2D.transform2Point(transformMatrix, lb);
        rb = Matrix2D.transform2Point(transformMatrix, rb);
        const b = new Bound();
        b.extend(...lt);
        b.extend(...rt);
        b.extend(...lb);
        b.extend(...rb);
        return b.getBounds();
    }

    render(ctx, event) {
        if(!this.isVisible) {
            return;
        }
        ctx.save();
        this.updateContext(ctx, event);
        this.updateComplexProps(ctx);
        this._render(ctx, event);
        ctx.restore();
    }

    _render(ctx, event) {
        let transformMatrix = Matrix2D.new();
        if(event) {
            Matrix2D.translate(transformMatrix, -event.stageX, -event.stageY);
        }
        const matrix = Matrix2D.multiply(transformMatrix, this.getConcatenatedMatrix());
        ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]);
        this.draw(ctx);
    }

    draw(ctx) {
    }

    /**
     * apply own transformation, alpha, clipping path, etc
     */
    updateContext(ctx, event) {
        let transformMatrix = Matrix2D.new();
        if(event) {
            Matrix2D.translate(transformMatrix, -event.stageX, -event.stageY);
        }
        const clipGraphic = this.clipGraphic;
        if(clipGraphic) {
            const matrix = Matrix2D.multiply(transformMatrix, this.getConcatenatedMatrix());
            const {x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY} = clipGraphic;
            Matrix2D.appendTransform(matrix, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY);

            ctx.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]);
            ctx.beginPath();
            clipGraphic.render();
            ctx.clip();
        }
    }

    updateComplexProps(ctx) {
        const alpha = this.getAlpha();
        const shadow = this.getShadow();
        const compositeOperation = this.getCompositeOperation();
        if(compositeOperation) {
            ctx.globalCompositeOperation = compositeOperation;
        }
        ctx.complexAlpha = alpha;
        if(shadow) {
            ctx.shadowColor = shadow.color;
            ctx.shadowOffsetX = shadow.offsetX;
            ctx.shadowOffsetY = shadow.offsetY;
            ctx.shadowBlur = shadow.blur;
        }
    }

    animateTo(keys, config = {}) {
        Object.assign(config, {
            from: {},
            to  : keys
        });
        for(let key in keys) {
            config.from[key] = this[key];
        }
        const onStart = config.onStart || noop;
        config.onStart = () => {
            onStart();
        };
        const onUpdate = config.onUpdate || noop;
        config.onUpdate = (props) => {
            Object.assign(this, props);
            onUpdate(props);
        };
        const onFinish = config.onFinish || noop;
        config.onFinish = () => {
            onFinish();
        };

        const tween = new Tween(config);

    }

    clone() {
        console.log('not yet implement.');
    }

    destroy() {
        this.parent.remove(this);
    }
}

export default DisplayObject
