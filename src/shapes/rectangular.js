import Base from "./base";

class Rectangular extends Base {

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

export default Rectangular
