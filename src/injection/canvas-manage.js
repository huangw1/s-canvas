import {addListener, getPointer, removeListener} from "../utils/dom";

class CanvasManage {

    point = {
        x: 0,
        y: 0
    };

    constructor(sc) {
        this.sc = sc;
        this.bindEvents();
    }

    bindEvents() {
        const {element} = this.sc;
        addListener(element, 'mousedown', this.mouseDown);
        addListener(element, 'mousemove', this.mouseMove);
        addListener(element, 'wheel', this.mouseScale);
    }

    mouseDown = (e) => {
        const {_objects, enableGlobalTranslate} = this.sc;
        const {x, y} = getPointer(e);

        this.cacheX = x;
        this.cacheY = y;

        // 已选中
        const downItems = _objects.filter(item => {
            return item.isPointInner(x, y);
        });
        const downItem = downItems[0];
        // 触发事件
        if (downItem) {
            if (downItem.enableChangeIndex) {
                this.sc.changeOrder(downItem);
            }
            downItem.emit('mousedown');
        }

        // 可移动、已选中
        const enableDragItems = _objects.filter(item => {
            return item.isPointInner(x, y) && item.enableDrag;
        });
        const target = enableDragItems[0];

        const mouseMove = (e) => {
            const {x, y} = getPointer(e);
            target.moveX = target.moveX + x - this.cacheX;
            target.moveY = target.moveY + y - this.cacheY;
            target.isDragging = true;
            this.sc.redraw();
            this.cacheX = x;
            this.cacheY = y;
        }

        const mouseUp = (e) => {
            const {x, y} = getPointer(e);
            const destinationItems = _objects.filter(item => {
                return item.isPointInner(x, y);
            });
            const destination = destinationItems[1];
            if (destination) {
                // todo drop event
            }
            target.isDragging = false;
            removeListener(document, 'mousemove', mouseMove);
            removeListener(document, 'mouseup', mouseUp);
        }

        if (target && target.enableDrag) {
            addListener(document, 'mousemove', mouseMove);
            addListener(document, 'mouseup', mouseUp);
        }

        if (enableGlobalTranslate && !downItems.length) {
            const globalMove = (e) => {
                const {x, y} = getPointer(e);
                this.sc.transX = this.sc.transX + x - this.cacheX;
                this.sc.transY = this.sc.transY + y - this.cacheY;
                this.cacheX = x;
                this.cacheY = y;
            }

            const globalUp = () => {
                removeListener(document, 'mousemove', globalMove);
                removeListener(document, 'mouseup', globalUp);
            }
            addListener(document, 'mousemove', globalMove);
            addListener(document, 'mouseup', globalUp);
        }
    }

    mouseMove = (e) => {
        Object.assign(this.point, getPointer(e, false));

        const {_objects} = this.sc;
        const {x, y} = getPointer(e);
        const draggingItem = _objects.filter(item => {
            return item.isDragging;
        });
        const targetItems = _objects.filter(item => {
            return item.isPointInner(x, y);
        });
        if (draggingItem.length) {
            const target = targetItems[1];
            if (target) {
                if (!target.hasDragIn) {
                    target.emit('dragin');
                    target.hasDragIn = true;
                }
                _objects
                    .filter(item => {
                        return item.hasDragIn && !item.isPointInner(x, y);
                    })
                    .forEach(item => {
                        item.emit('dragout');
                        item.hasDragIn = false;
                    });
            }
        } else {
            const target = targetItems[0];
            if (target) {
                if (!target.hasEnter) {
                    target.emit('mouseenter');
                    target.hasEnter = true;
                } else {
                    target.emit('mousemove');
                }
            }

            _objects
                .filter(item => {
                    return item.hasEnter && !item.isPointInner(x, y);
                })
                .forEach(item => {
                    item.emit('mouseleave');
                    item.hasEnter = false;
                });
        }
    }

    mouseScale = (e) => {
        if(this.sc.enableScale) {
            const deltaY = e.deltaY;
            if(deltaY > 0) {
                if(this.sc.scale > 0.5) {
                    this.sc.scale -= 0.2;
                    this.sc.redraw();
                }
            } else {
                if(this.sc.scale < 2) {
                    this.sc.scale += 0.2;
                    this.sc.redraw();
                }
            }
        }
    }

    getPoint() {
        return this.point;
    }
}

export default CanvasManage;
