export const addListener = (element, event, handler) => {
    element.addEventListener(event, handler, false);
};

export const removeListener = (element, event, handler) => {
    element.removeEventListener(event, handler, false);
};

export const getScrollLeftTop = (element) => {
    let left = 0;
    let top = 0;
    while (element && element.parentNode) {
        element = element.parentNode;

        if (element === document.body) {
            left = document.body.scrollLeft;
            top = document.body.scrollTop;
        } else {
            left += element.scrollLeft || 0;
            top += element.scrollTop || 0;
        }
        if (element.nodeType === 1 && element.style.position === 'fixed') {
            break;
        }
    }
    return {
        left,
        top
    }
};

export const getElementOffset = (element) => {
    let top = 0;
    let left = 0;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top,
        left,
    };
}

export const getPointer = (event) => {
    const element = event.target;
    const scroll = getScrollLeftTop(element);
    const offset = getElementOffset(element);
    return {
        x: event.clientX + scroll.left - offset.left,
        y: event.clientY + scroll.top - offset.top
    };
};