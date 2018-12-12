import DisplayObject from "./display-object";

/**
 * canvas original methods
 */
const originalMethods = [
    'fillStyle',
    'strokeStyle',
    'lineWidth',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'miterLimit',

    'font',
    'textAlign',
    'textBaseline',
    'fillText',

    'clearRect',
    'rect',
    'setLineDash',
    'strokeRect',
    'fillRect',
    'beginPath',
    'arc',
    'closePath',
    'fill',
    'stroke',
    'moveTo',
    'lineTo',
    'bezierCurveTo',
    'quadraticCurveTo',
    'createRadialGradient',
    'createLinearGradient',
    'addColorStop',
    'fillGradient',
    'arcTo'
];

/**
 * Graphic is a class that exposes an easy way to use canvas api.
 */
class Graphic extends DisplayObject {
    constructor() {
        super();

        this.cmds = [];
        this.currentGradient = null;

        originalMethods.forEach(method => {
            this[method] = (...params) => {
                this.cmds.push([method, params]);
            }
        })
    }

    clear() {
        this.cmds.length = 0;
        this.currentGradient = undefined;
        return this;
    }

    /**
     * draw path base on curvature
     */
    drawCurvePath(x, y, x1, y1, curvature) {
        const px = (x + x1) / 2 - (y - y1) * curvature;
        const py = (y + y1) / 2 - (x1 - x) * curvature;
        this.cmds.push(['quadraticCurveTo', [px, py, x1, y1]]);
        return this;
    }

    draw(ctx) {
        ctx.beginPath();
        this.cmds.forEach(cmd => {
            const [methodName, params] = cmd;
            if (methodName === 'addColorStop') {
                if (this.currentGradient) {
                    this.currentGradient.addColorStop(params[0], params[1]);
                }
            } else if (methodName === 'fillGradient') {
                ctx.fillStyle = this.currentGradient;
            } else if (typeof ctx[methodName] !== 'function') {
                ctx[methodName] = params[0];
            } else {
                const result = ctx[methodName].apply(ctx, params);
                if (methodName === 'createRadialGradient') {
                    this.currentGradient = result;
                }
            }
        });
        ctx.closePath();
    }

    clone() {
    }
}

export default Graphic
