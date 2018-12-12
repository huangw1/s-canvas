import Graphic from "../graphic";

class Rect extends Graphic {
    constructor(width, height, option) {
        super();

        this.width = width;
        this.height = height;
        this.option = option || {};

        this._buildCmd();
        this.setBounds(0, 0, width, height);
    }

    _buildCmd() {
        const {fillStyle, strokeStyle, lineWidth } = this.option;
        if (fillStyle) {
            this.fillStyle(fillStyle);
            this.fillRect(0, 0, this.width, this.height);
        }

        if (strokeStyle) {
            this.strokeStyle(strokeStyle);
            if (lineWidth) {
                this.lineWidth(lineWidth);
            }
            this.strokeRect(0, 0, this.width, this.height);
        }
    }
}

export default Rect
