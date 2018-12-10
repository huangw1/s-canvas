// import ImageManage from "./injection-removed/image-manage";
// import CanvasManage from "./injection-removed/canvas-manage";
// import {register, reverse} from "./utils";
// import Rectangular from "./shapes-removed/rectangular";
// import Image from "./shapes-removed/image";
// import Line from "./shapes-removed/line";
// import Text from "./shapes-removed/text";
// import ctxWrapper from "./core/ctx";
//
// /**
//  * todo 全局触发事件
//  * todo 剪切不在边框内
//  */
// class SC {
//
//     version = '1.0.0';
//
//     objects = [];
//
//     images = [];
//
//     tweenList = [];
//
//     element = null;
//
//     canvas = null;
//
//     width = 0;
//
//     height = 0;
//
//     transX = 0;
//
//     transY = 0;
//
//     scale = 1;
//
//     requestId = null;
//
//     isDragging = false;
//
//     isAnimating = false;
//
//     enableScale = false;
//
//     enableGlobalTranslate = false;
//
//     constructor(id, setting) {
//         this.config(setting);
//
//         this.element = document.getElementById(id);
//         this.canvas = ctxWrapper(this.element.getContext('2d'));
//         this.element.width = this.width;
//         this.element.height = this.height;
//     }
//
//     config(setting) {
//         Object.assign(this, setting);
//     }
//
//     addChild(object) {
//         object = Array.isArray(object) ? object : [object];
//         this.objects = this.objects.concat(object);
//         this.objects.sort((a, b) => a.zIndex - b.zIndex);
//
//         this._objects = reverse(this.objects);
//     }
//
//     draw() {
//         const imageManage = new ImageManage();
//         imageManage.addImage(this.images);
//         imageManage.ready().then(() => {
//             this._draw();
//             this._attachCanvasEvents();
//         })
//         this.imageManage = imageManage;
//     }
//
//     _draw() {
//         this.objects.forEach(item => item.draw());
//     }
//
//     redraw() {
//         // bug
//         this.canvas.save();
//         this.canvas.setTransform(1, 0, 0, 1, 0, 0);
//         this.clear();
//         this.canvas.restore();
//         this.canvas.translate(200, 200);
//         this.canvas.scale(this.scale, this.scale);
//         this.canvas.translate(-200, -200);
//         this.canvas.translate(this.transX / this.scale, this.transY / this.scale);
//         this._draw();
//     }
//
//     clear() {
//         this.canvas.clearRect(0, 0, this.width, this.height);
//     }
//
//     getImage(name) {
//         return this.imageManage.getImage(name).image;
//     }
//
//     _attachCanvasEvents() {
//         this.canvasManage = new CanvasManage(this);
//     }
//
//     // object being dragged
//     changeOrder(item) {
//         const index = this.objects.indexOf(item);
//         const target = this.objects[index];
//         this.objects.splice(index, 1);
//         this.objects.push(target);
//         this._objects = reverse(this.objects);
//         this.redraw();
//     }
//
//     animate(tween) {
//         this.tweenList.push(tween);
//         this.tick();
//     }
//
//     clearAnimate() {
//         this.tweenList.length = 0;
//     }
//
//     stop() {
//         if (this.requestId) {
//             this.isAnimating = false;
//             cancelAnimationFrame(this.requestId);
//         }
//     }
//
//     tick() {
//         const requestFunc = () => {
//             if (!this.tweenList.length) {
//                 this.isAnimating = false;
//                 return;
//             }
//             this.tweenList.forEach((tween, i) => {
//                 if (tween.finished) {
//                     this.tweenList.splice(i--, 1);
//                 } else if (tween.update) {
//                     tween.update();
//                 } else if (typeof tween === 'function') {
//                     tween();
//                 }
//             });
//             this.redraw();
//             this.requestId = requestAnimationFrame(requestFunc);
//         };
//         if (this.tweenList.length) {
//             if (!this.isAnimating) {
//                 this.isAnimating = true;
//                 requestFunc();
//             }
//         }
//     }
// }
//
// register(SC, Rectangular.type, Rectangular);
// register(SC, Image.type, Image);
// register(SC, Line.type, Line);
// register(SC, Text.type, Text);

import Stage from "./core/stage";
import Graphic from "./display/graphic";
import Group from "./display/group";
import Rect from "./display/shapes/rect";

window.sc = {};
sc.Stage = Stage;
sc.Group = Group;
sc.Graphic = Graphic;
sc.Rect = Rect;
