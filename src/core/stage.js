import Group from "../display/group";
import {addListener, getPointer} from "../base/dom";
import {CLICK, DRAG, MOUSE_DOWN, MOUSE_MOVE, MOUSE_OUT, MOUSE_OVER, MOUSE_UP} from "../base/event-type";
import Hit from "./hit";
import BrowserEvent from "../base/browser-event";

/**
 * todo 事件触发 - 事件监听
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

        this._mouseDownX = null;
        this._mouseDownY = null;
        this._mouseUpX = null;
        this._mouseUpY = null;
        this._prevStageX = null;
        this._prevStageY = null;
        this._dragObject = null;
        this._overObject = null;

        this.createEventHandler();
    }

    createEventHandler() {
        addListener(this.canvas, MOUSE_DOWN, (event) => this._handleMouseDown(event));
        addListener(this.canvas, MOUSE_MOVE, (event) => this._handleMouseMove(event));
        addListener(this.canvas, MOUSE_UP, (event) => this._handleMouseUp(event));
        addListener(this.canvas, MOUSE_OUT, (event) => this._handleMouseUp(event));
    }

    _handleMouseDown(event) {
        this._computeStageXY(event);
        const target = this._getObjectUnderPoint(event);
        if(target) {
            this._dragObject = target;
        }
        this._mouseDownX = event.stageX;
        this._mouseDownY = event.stageY;
        this._prevStageX = event.stageX;
        this._prevStageY = event.stageY;
    }

    _handleMouseMove(event) {
        this._computeStageXY(event);
        const target = this._getObjectUnderPoint(event);
        const browserEvent = new BrowserEvent();
        browserEvent.stageX = event.stageX;
        browserEvent.stageY = event.stageY;
        browserEvent.pureEvent = event;

        // 拖拽
        if (this._dragObject) {
            browserEvent.type = DRAG;
            browserEvent.dx = event.stageX - this._prevStageX;
            browserEvent.dy = event.stageY - this._prevStageY;
            this._prevStageX = event.stageX;
            this._prevStageY = event.stageY;
            this._dragObject.dispatchEvent(browserEvent);
        }
        // cursor 由外部指定
        if(target) {
            if(this._overObject === null) {
                // 移入新的 _overObject
                browserEvent.type = MOUSE_OVER;
                this._overObject = target;
                this._overObject.dispatchEvent(browserEvent);
                this._setCursor(this._overObject);
            } else {
                if(target.id !== this._overObject.id) {
                    // 移出旧的 _overObject
                    browserEvent.type = MOUSE_OUT;
                    this._overObject.dispatchEvent(browserEvent);
                    // 移入新的 _overObject
                    browserEvent.type = MOUSE_OVER;
                    this._overObject = target;
                    this._overObject.dispatchEvent(browserEvent);
                    this._setCursor(this._overObject);
                } else {
                    // 经过原先的 _overObject
                    browserEvent.type = MOUSE_MOVE;
                    this._overObject.dispatchEvent(browserEvent);
                }
            }
        } else if(this._overObject) {
            // 移出原先的 _overObject
            browserEvent.type = MOUSE_OUT;
            this._overObject.dispatchEvent(browserEvent);
            this._overObject = null;
            this._setCursor({ cursor: 'default' });
        }
    }

    _handleMouseUp(event) {
        this._computeStageXY(event);
        const target = this._getObjectUnderPoint(event);
        this._mouseUpX = event.stageX;
        this._mouseUpY = event.stageY;

        const browserEvent = new BrowserEvent();
        browserEvent.stageX = event.stageX;
        browserEvent.stageY = event.stageY;
        browserEvent.pureEvent = event;

        if( target && Math.abs(this._mouseDownX - this._mouseUpX) < 30 && Math.abs(this._mouseDownY - this._mouseUpY) < 30) {
            // 触发点击
            browserEvent.type = CLICK;
            target.dispatchEvent(browserEvent);
        }

        this._dragObject = null;
        this._prevStageX = null;
        this._prevStageY = null;
    }

    _getObjectUnderPoint(event) {
        return this.hit._hitPix(event);
    }

    _computeStageXY(event) {
        const point = getPointer(event);
        event.stageX = point.x;
        event.stageY = point.y;
    }

    _setCursor(target) {
        if(target.cursor) {
            this.canvas.style.cursor = target.cursor;
        } else if(target.parent) {
            this._setCursor(target.parent);
        }

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
