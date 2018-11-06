import ImageLoader from "./image-loader";
import CanvasEvent from "./canvas-event";
import {register, reverse} from "./utils";
import Rectangular from "./shapes/rectangular";

// todo 全局触发事件
class SC {

    version = '1.0.0';

    objects = [];

    images = [];

    element = null;

    canvas = null;

    width = 0;

    height = 0;

    transX = 0;

    transY = 0;

    scale = 0;

    isDragging = false;

    enableGlobalTranslate = false;

    constructor(id, setting) {
        this.config(setting);

        this.element = document.getElementById(id);
        this.canvas = this.element.getContext('2d');
        this.element.width = this.width;
        this.element.height = this.height;
    }

    config(setting) {
        Object.assign(this, setting);
    }

    addChild(object) {
        object = Array.isArray(object) ? object : [object];
        this.objects = this.objects.concat(object);
        this.objects.sort((a, b) => a.zIndex - b.zIndex);

        this._objects = reverse(this.objects);
    }

    draw() {
        const imageLoader = new ImageLoader();
        imageLoader.addImage(this.images);
        imageLoader.ready().then(() => {
            this._draw();
            this._attachCanvasEvents();
        })
        this.imageLoader = imageLoader;
    }

    _draw() {
        this.objects.forEach(item => item.draw());
    }

    redraw() {
        this.clear();
        this.canvas.save();
        this.canvas.translate(this.transX, this.transY);
        this.draw();
        this.canvas.restore();
    }

    clear() {
        this.canvas.clearRect(0, 0, this.width, this.height);
    }

    getImage(name) {
        this.imageLoader.getImage(name);
    }

    _attachCanvasEvents() {
        const canvasEvent = new CanvasEvent(this);
        this.canvasEvent = canvasEvent;
    }

    // object being dragged
    _changeOrder(item) {
        const index = this.objects.indexOf(item);
        const target = this.objects[index];
        this.objects.splice(index, 1);
        this.objects.push(target);
        this._objects = reverse(this.objects);
        this.redraw();
    }
}

register(SC, Rectangular.type, Rectangular);

window.SC = SC;