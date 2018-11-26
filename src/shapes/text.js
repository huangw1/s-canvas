import Base from "./base";
import {textEllipsis} from "../utils";

class Text extends Base {

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
        canvas.textBaseline = 'top';
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

    getBounds() {
        const {startX, startY, width, height, moveX, moveY} = this;
        return {
            startX: startX + moveX,
            startY: startY + moveY,
            width,
            height
        }
    }

    isPointInner(x, y) {
        const {startX, startY, width, height} = this.getBounds();
        return x > startX && x < (startX + width) && y > startY && y < (startY + height);
    }
}

export default Text
