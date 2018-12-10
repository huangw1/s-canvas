/**
 * 外围边框
 */
class Bound {

    constructor() {
        this.x1 = undefined;
        this.y1 = undefined;
        this.x2 = undefined;
        this.y2 = undefined;
    }

    extend(x1, y1) {
        if(this.x1 === undefined) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x1;
            this.y2 = y1;
            return;
        }
        if (this.x1 > x1) {
            this.x1 = x1;
        }
        if (this.y1 > y1) {
            this.y1 = y1;
        }
        if (this.x2 < x1) {
            this.x2 = x1;
        }
        if (this.y2 < y1) {
            this.y2 = y1;
        }
    }

    reset() {
        this.x1 = undefined;
        this.y1 = undefined;
        this.x2 = undefined;
        this.y2 = undefined;
    }

    get centerX() {
        return (this.x1 + this.x2) / 2;
    }

    get centerY() {
        return (this.y1 + this.y2) / 2;
    }

    get width() {
        return this.x2 - this.x1;
    }

    get height() {
        return this.y2 - this.y1;
    }

    getBounds() {
        return {
            x: this.x1,
            y: this.y1,
            width: this.x2 - this.x1,
            height: this.y2 - this.y1
        }
    }

    setBounds(x, y, width, height) {
        const {lt,rt, lb, rb} = this.getPoints(x, y, width, height);
        this.reset();
        this.extend(...lt);
        this.extend(...rt);
        this.extend(...lb);
        this.extend(...rb);
    }

    getPoints(x, y, width, height) {
        if(arguments.length) {
            const lt = [x, y];
            const rt = [x + width, y];
            const lb = [x, y + height];
            const rb = [x + width, y + height];
            return {
                lt,
                rt,
                lb,
                rb
            };
        }
        return {
            lt: [this.x1, this.y1],
            rt: [this.x2, this.y1],
            lb: [this.x1, this.y2],
            rb: [this.x2, this.y2]
        };
    }
}

export default Bound
