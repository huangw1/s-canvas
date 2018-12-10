import Graphic from "../graphic";

class Rect extends Graphic {
    constructor(width, height, option) {
        super();

        this.width = width;
        this.height = height;
        this.option = option || {};
    }

    draw(ctx) {
        if (this.option.fillStyle) {
            this.fillStyle(this.option.fillStyle);
            this.fillRect(0, 0, this.width, this.height);
        }

        if (this.option.strokeStyle) {
            this.strokeStyle(this.option.strokeStyle);
            if (this.option.lineWidth) {
                this.lineWidth(this.option.lineWidth);
            }
            this.strokeRect(0, 0, this.width, this.height);
        }
        super.draw(ctx);
    }
}

export default Rect
