import Base from "./base";

class Image extends Base {

    static type = 'image';

    constructor(sc, setting) {
        super(setting);

        this.sc = sc;
    }

    draw() {
        const {canvas, transX, transY} = this.sc;
        const {fixed, startX, startY, width, height, moveX, moveY, name, sliceX, sliceY, sliceWidth, sliceHeight} = this;
        const src = this.sc.getImage(name);

        canvas.save();
        canvas.translate(moveX, moveY);
        if(fixed) {
            canvas.translate(transX, transY);
        }
        if(sliceWidth && sliceHeight) {
            canvas.drawImage(src, sliceX, sliceY, sliceWidth, sliceHeight, startX, startY, width, height);
        } else {
            canvas.drawImage(src, startX, startY, width, height);
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

export default Image