import Geometry from "./geometry";
import {pointFromSquare, squareContainsPoint} from "../utils/geometryutil";
import {Bound} from "../utils/bound";

class Rectangular extends Geometry {

    static type = 'rectangular';

    constructor(sc, setting) {
        super(setting);

        this.sc = sc;
    }

    draw() {
        const {
            canvas,
            transX,
            transY
        } = this.sc;
        const {
            fixed,
            startX,
            startY,
            width,
            height,
            fillStyle,
            moveX,
            moveY
        } = this;

        canvas.save();

        // 逻辑问题
        canvas.translate(startX + width / 2 + moveX, startY + height / 2 + moveY);
        canvas.rotate((Math.PI / 180) * this.rotate);
        canvas.translate(-(startX + width / 2 + moveX), -(startY + height / 2 + moveY));

        canvas.translate(moveX, moveY);
        if (fixed) {
            canvas.translate(-transX, -transY);
        }
        canvas.fillStyle = fillStyle;
        canvas.fillRect(startX, startY, width, height);
        canvas.restore();
    }

    getBound() {
        const {startX, startY, width, height, moveX, moveY} = this;
        const point = pointFromSquare(startX + moveX, startY + moveY, width, height);
        if(this.bound === undefined) {
            this.bound = new Bound(...point);
            return this.bound
        }
        this.bound.reset(...point);
        return this.bound

    }

    isPointInner(x, y) {
        const bound = this.getBound();
        return squareContainsPoint(bound, x, y)
    }
}

export default Rectangular
