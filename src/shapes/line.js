import Base from "./base";
import {getCtrlPoint} from "../utils";

class Line extends Base {

    static type = 'line';

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
            moveX,
            moveY,
            matrix,
            lineWidth,
            lineDash,
            strokeStyle,
            lineCap,
            lineJoin,
            smooth
        } = this;

        canvas.save();
        canvas.translate(moveX, moveY);
        if (fixed) {
            canvas.translate(-transX, -transY);
        }
        canvas.lineWidth = lineWidth;
        canvas.strokeStyle = strokeStyle;
        canvas.beginPath();
        if (lineDash && Array.isArray(lineDash)) {
            canvas.setLineDash(lineDash);
        }
        if (lineCap) {
            canvas.lineCap = lineCap;
        }
        if (lineJoin) {
            canvas.lineJoin = lineJoin;
        }
        if (smooth) {
            matrix.forEach((point, i) => {
                if (i === 0) {
                    canvas.moveTo(point[0], point[1]);
                } else {
                    let cMatrix = getCtrlPoint(matrix, i - 1);
                    canvas.bezierCurveTo(cMatrix.pA.x, cMatrix.pA.y, cMatrix.pB.x, cMatrix.pB.y, point[0], point[1]);
                }
            })
        } else {
            matrix.forEach((point, i) => {
                if (i === 0) {
                    canvas.moveTo(point[0], point[1]);
                } else {
                    canvas.lineTo(point[0], point[1]);
                }
            })
        }
        canvas.stroke();
        canvas.closePath();
        canvas.restore();
    }

    getBounds() {
        return {};
    }

    isPointInner() {
        return false;
    }
}

export default Line
