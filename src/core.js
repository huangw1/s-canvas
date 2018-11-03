
class SC {

    objects = [];

    element = null;

    canvas = null;

    width = 0;

    height = 0;

    transX = 0;

    transY = 0;

    scale = 0;

    isDragging = false;

    eventTypes = [
        'mousedown',
        'mouseup',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'dragin',
        'dragout',
        'drop'
    ];

    constructor(config) {

    }
}

export default SC