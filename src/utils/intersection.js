// fabric intersection
export class Intersection {

    points = [];

    constructor(status) {
        this.status = status;
    }

    appendPoint(point) {
        point = Array.isArray(point) ? point : [point];
        this.points = this.points.concat(point);
    }
}

const intersectLineLine = (a1, a2, b1, b2) => {
    let result,
        uaT = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
        ubT = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
        uB = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    if (uB !== 0) {
        let ua = uaT / uB,
            ub = ubT / uB;
        if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
            result = new Intersection('intersection');
            result.appendPoint({
                x: a1.x + ua * (a2.x - a1.x),
                y: a1.y + ua * (a2.y - a1.y)
            });
        }
        else {
            result = new Intersection();
        }
    } else {
        if (uaT === 0 || ubT === 0) {
            result = new Intersection('coincident');
        }
        else {
            result = new Intersection('parallel');
        }
    }
    return result;
};

const intersectLinePolygon = (a1, a2, points) => {
    const result = new Intersection();
    for(let i = 0; i < points.length; i++) {
        const b1 = points[i];
        const b2 = points[(i + 1) % points.length];
        const intersection = intersectLineLine(a1, a2, b1, b2);
        result.appendPoint(intersection.points);
    }
    if(result.points.length) {
        result.status = 'intersection';
    }
    return result;
};

const intersectPolygonRectangular = () => {

};


