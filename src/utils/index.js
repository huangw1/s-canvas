
export const noop = () => {
};

export const reverse = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = array[array.length - i - 1];
    }
    return result;
};

// register shape component
export const register = (SC, name, Component) => {
    SC.prototype[name] = function (setting) {
        return new Component(this, setting);
    }
};

export const textEllipsis = (canvas, text, maxWidth) => {
    let textWidth = canvas.measureText(text).width;
    let ellipsis = '...';
    let ellipsisWidth = canvas.measureText(ellipsis).width;
    if(textWidth <= maxWidth || textWidth <= ellipsisWidth) {
        return text;
    }
    let length = text.length;
    while (textWidth >= (maxWidth - ellipsisWidth) && length-- > 0) {
        text = text.substring(0, length);
        textWidth = canvas.measureText(text).width;
    }
    return text + ellipsis;
};

// curve
export const drawCurvePath = (canvas, start, end, curvature) => {
    const px = (start[0] + end[0]) / 2 - (start[1] - end[1]) * curvature;
    const py = (start[1] + end[1]) / 2 - (end[0] - start[0]) * curvature;
    canvas.moveTo(start[0], start[1]);
    canvas.quadraticCurveTo(px, py, end[0], end[1]);
};

// bezier
export const getCtrlPoint = function (ps, i, a, b) {
    let pAx, pAy, pBx, pBy;
    if (!a || !b) {
        a = 0.25;
        b = 0.25;
    }
    if (i < 1) {
        pAx = ps[0][0] + (ps[1][0] - ps[0][0]) * a;
        pAy = ps[0][1] + (ps[1][1] - ps[0][1]) * a;
    } else {
        pAx = ps[i][0] + (ps[i + 1][0] - ps[i - 1][0]) * a;
        pAy = ps[i][1] + (ps[i + 1][1] - ps[i - 1][1]) * a;
    }
    if (i > ps.length - 3) {
        let last = ps.length - 1;
        pBx = ps[last][0] - (ps[last][0] - ps[last - 1][0]) * b;
        pBy = ps[last][1] - (ps[last][1] - ps[last - 1][1]) * b;
    } else {
        pBx = ps[i + 1][0] - (ps[i + 2][0] - ps[i][0]) * b;
        pBy = ps[i + 1][1] - (ps[i + 2][1] - ps[i][1]) * b;
    }
    return {
        pA: {x: pAx, y: pAy},
        pB: {x: pBx, y: pBy}
    };
};
