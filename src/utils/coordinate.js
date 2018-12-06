/**
 * 坐标转换
 * @type {{add(*, *): *, rotate(*, *=): *, scale(*, *): *}}
 */
const Coordinate = {
    add(coordinate, delta) {
        coordinate[0] += delta[0];
        coordinate[1] += delta[1];
        return coordinate;
    },
    rotate(coordinate, angle) {
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);
        const x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
        const y = coordinate[0] * sinAngle + coordinate[1] * cosAngle;
        coordinate[0] = x;
        coordinate[1] = y;
        return coordinate;
    },
    scale(coordinate, scale) {
        coordinate[0] *= scale;
        coordinate[1] *= scale;
        return coordinate;
    }
};

export default Coordinate
