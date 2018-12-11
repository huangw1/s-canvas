import Graphic from "../graphic";

class Circle extends Graphic {
    constructor(radius, options) {
        super();

        this.radius = radius;
        this.options = options || {};

        this.buildCmds();
        this.setBounds(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
    }

    buildCmds() {
        const {fillStyle, strokeStyle, lineWidth} = this.options;
        this.arc(0, 0, this.radius, 0,  Math.PI * 2, false);
        if (fillStyle) {
            this.fillStyle(fillStyle);
            this.fill();
        }
        if(strokeStyle) {
            if(lineWidth) {
                this.lineWidth(lineWidth);
            }
            this.strokeStyle(strokeStyle);
            this.stroke();
        }
    }
}

export default Circle
