import Geometry from "./geometry";
import {pointFromSquare, squareContainsPoint} from "../utils/geometryutil";
import {Bound} from "../utils/bound";

class Image extends Geometry {

    static type = 'image';

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
            moveX,
            moveY,
            image,
            sliceX,
            sliceY,
            sliceWidth,
            sliceHeight
        } = this;
        const src = this.sc.getImage(image);

        canvas.save();
        canvas.translate(moveX, moveY);
        if(fixed) {
            canvas.translate(-transX, -transY);
        }
        if(sliceWidth && sliceHeight) {
            canvas.drawImage(src, sliceX, sliceY, sliceWidth, sliceHeight, startX, startY, width, height);
        } else {
            canvas.drawImage(src, startX, startY, width, height);
        }
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

export default Image
