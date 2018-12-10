import Geometry from "./geometry";
import {textEllipsis} from "../utils";
import {pointFromSquare, squareContainsPoint} from "../utils/geometryutil";
import {Bound} from "../base/bound";

class Text extends Geometry {

    static type = 'text';

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
        let {
            fixed,
            startX,
            startY,
            width,
            height,
            moveX,
            moveY,
            text,
            backgroundColor,
            font,
            textBaseline = 'top',
            strokeStyle,
            fillStyle,
            paddingLeft = 0,
            paddingTop = 0,
            center
        } = this;

        canvas.save();
        canvas.translate(moveX, moveY);
        if(fixed) {
            canvas.translate(-transX, -transY);
        }
        if(backgroundColor) {
            canvas.save();
            canvas.fillStyle = backgroundColor;
            canvas.fillRect(startX, startY, width, height);
            canvas.restore();
        }
        canvas.font = font;
        canvas.textBaseline = textBaseline;
        const textWidth = canvas.measureText(text).width;
        const ellipsisText = textEllipsis(canvas, text, width - paddingLeft * 2);
        if(strokeStyle) {
            canvas.strokeStyle = strokeStyle;
            if(center) {
                canvas.strokeText(ellipsisText, startX + (width - textWidth - paddingLeft * 2) / 2, startY + paddingTop);
            } else {
                canvas.strokeText(ellipsisText, startX + paddingLeft, startY + paddingTop);
            }
        } else {
            canvas.fillStyle = fillStyle;
            if(center) {
                canvas.fillText(ellipsisText, startX + (width - textWidth - paddingLeft * 2) / 2, startY + paddingTop);
            } else {
                canvas.fillText(ellipsisText, startX + paddingLeft, startY + paddingTop);
            }
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

export default Text
