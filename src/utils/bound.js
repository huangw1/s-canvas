/**
 * 外围边框
 */
export class Bound {

    constructor(x1, y1, x2, y2) {
        this.xMin = x1;
        this.xMax = x2;
        this.yMin = y1;
        this.yMax = y2;
    }

    extend(xMin, xMax, yMin, yMax) {
        if(this.xMin > xMin) {
            this.xMin = xMin;
        }
        if(this.xMax < xMax) {
            this.xMax = xMax;
        }
        if(this.yMin > yMin) {
            this.yMin = yMin;
        }
        if(this.yMax < yMax) {
            this.yMax = yMax;
        }
    }

    reset(x1, y1, x2, y2) {
        this.xMin = x1;
        this.xMax = x2;
        this.yMin = y1;
        this.yMax = y2;
    }

    get centerX() {
        return (this.xMin + this.xMax) / 2;
    }

    get centerY() {
        return (this.yMin + this.yMax) / 2;
    }

    get width() {
        return this.xMax - this.xMin;
    }

    get height() {
        return this.yMax - this.yMin;
    }


}
