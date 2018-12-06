import Geometry from "./geometry";
import {getCtrlPoint} from "../utils";
import {squareSegmentDistance} from "../utils/geometryutil";
import {Bound} from "../utils/bound";

class Line extends Geometry {

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

    getBound() {
        const matrix = this.matrix;
        if(this.bound === undefined) {
            let point = matrix[0];
            const bound = new Bound(point[0], point[1], point[0], point[1]);
            for(let i = 1; i < matrix.length; i++) {
                point = matrix[i];
                bound.extend(point[0], point[1], point[0], point[1]);
            }
            this.bound = point;
        }
        return this.bound;
    }

    isPointInner(x, y) {
        const matrix = this.matrix;
        let find = false;
        for(let i = 0; i < matrix.length - 1; i++) {
            let p = matrix[i];
            let nextP = matrix[i + 1];
            let distance = squareSegmentDistance(x, y, p[0], p[1], nextP[0], nextP[1]);
            if(distance <= 1) {
                find = true;
                break;
            }
        }
        return find
    }
}

export default Line
