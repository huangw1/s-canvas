import Group from "../display/group";
import {addListener, getPointer} from "../base/dom";
import {MOUSE_DOWN, MOUSE_MOVE, MOUSE_UP} from "../base/event-type";
import Hit from "./hit";

/**
 * Stage is a class
 */
class Stage extends Group {
    constructor(canvas, width, height) {
        super();

        this.name = 'Stage';
        this.canvas = typeof canvas === 'string' ? document.getElementById(canvas) : canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.hit = new Hit(this);
        this.createEventHandler();
    }

    createEventHandler() {
        addListener(this.canvas, MOUSE_DOWN, (event) => this._handleMouseDown(event));
        addListener(this.canvas, MOUSE_MOVE, (event) => this._handleMouseMove(event));
        addListener(this.canvas, MOUSE_UP, (event) => this._handleMouseUp(event));
    }

    _handleMouseDown(event) {
        this._computeStageXY(event);
        this._getObjectUnderPoint(event);
    }

    _handleMouseMove(event) {

    }

    _handleMouseUp(event) {

    }

    _getObjectUnderPoint(event) {
        return this.hit._hitPix(event);
    }

    _computeStageXY(event) {
        const point = getPointer(event);
        event.stageX = point.x;
        event.stageY = point.y;
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.render(this.ctx);
    }

    toDataURL(mimeType) {
        return this.canvas.toDataURL(mimeType || 'image/png');
    }
}

export default Stage
