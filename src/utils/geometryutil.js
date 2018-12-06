/**
 * 平方差
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
export const squareDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy)
}

/**
 * 点到线的距离
 * 根据向量点击判断：
 * 1. 0<t<1，投影在线段内
 * 2. t≥1，投影在延伸上，且同方向
 * 2. t≤0，投影在延伸上，且反方向
 * @param x
 * @param y
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export const squareSegmentDistance = (x, y, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if(dx !== 0 || dy !== 0) {
        let t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
        if(t > 1) {
            x1 = x2;
            y1 = y2;
        } else if(t > 0) {
            x1 += t * dx;
            y1 += t * dy;
        }
    }
    return squareDistance(x, y, x1, y1)
}

/**
 * 获取外接框
 * @param point
 * @param x
 * @param y
 * @returns {boolean}
 */
export const squareContainsPoint = (point, x, y) => {
    if(Array.isArray(point)) {
        return x >= point[0] && x <= point[2] && y >= point[1] && y  <= point[3]
    } else {
        return x >= point.xMin && x <= point.xMax && y >= point.yMin && y  <= point.yMax
    }
}

/**
 * 长宽转坐标点
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {*[]}
 */
export const pointFromSquare = (x, y, width, height) => {
    return [
        x, y, x + width, y + height
    ]
}
