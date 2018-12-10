
const DEG_TO_RAD = Math.PI/180;
/**
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 */
const Matrix2D = {

    initialize(a, b, c, d, e, f) {
        return [a, b, c, d, e, f];
    },

    new() {
        return [1, 0, 0, 1, 0, 0];
    },

    set(transform, a, b, c, d, e, f) {
        transform[0] = a;
        transform[1] = b;
        transform[2] = c;
        transform[3] = d;
        transform[4] = e;
        transform[5] = f;
        return transform;
    },

    reset(transform) {
        return Matrix2D.set(transform, 1, 0, 0, 1, 0, 0)
    },

    copy(transform) {
        return [...transform];
    },

    setFromTransform(transform1, transform2) {
        transform1[0] = transform2[0];
        transform1[1] = transform2[1];
        transform1[2] = transform2[2];
        transform1[3] = transform2[3];
        transform1[4] = transform2[4];
        transform1[5] = transform2[5];
        return transform1
    },

    /**
     * 获取坐标
     * @param transform
     * @param coordinate
     * @returns {*[]}
     */
    transform2Point(transform, coordinate) {
        const x = transform[0] * coordinate[0] + transform[2] * coordinate[1] + transform[4];
        const y = transform[1] * coordinate[0] + transform[3] * coordinate[1] + transform[5];
        return [x, y]
    },

    /**
     * 矩阵变换
     * @param transform1
     * @param transform2
     * @returns {*}
     */
    multiply(transform1, transform2) {
        const a1 = transform1[0];
        const b1 = transform1[1];
        const c1 = transform1[2];
        const d1 = transform1[3];
        const e1 = transform1[4];
        const f1 = transform1[5];
        const a2 = transform2[0];
        const b2 = transform2[1];
        const c2 = transform2[2];
        const d2 = transform2[3];
        const e2 = transform2[4];
        const f2 = transform2[5];

        transform1[0] = a1 * a2 + c1 * b2;
        transform1[1] = b1 * a2 + d1 * b2;
        transform1[2] = a1 * c2 + c1 * d2;
        transform1[3] = b1 * c2 + d1 * d2;
        transform1[4] = a1 * e2 + c1 * f2 + e1;
        transform1[5] = b1 * e2 + d1 * f2 + f1;

        return transform1
    },

    rotate(transform, angle) {
        const cos = Math.cos(angle * DEG_TO_RAD);
        const sin = Math.sin(angle * DEG_TO_RAD);

        return Matrix2D.multiply(transform, Matrix2D.initialize(cos, sin, -sin, cos, 0, 0))
    },

    scale(transform, x, y) {
        return Matrix2D.multiply(transform, Matrix2D.initialize(x, 0, 0, y, 0, 0))
    },

    translate: function (transform, dx, dy) {
        return Matrix2D.multiply(transform, Matrix2D.initialize(1, 0, 0, 1, dx, dy))
    },

    /**
     * steps follow:
     * 1. translate(x, y)
     * 2. rotate() and scale()
     * 3. translate(-originX, -originY)
     * 4. render()
     */
    appendTransform (transform, x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
        let cos = 1;
        let sin = 0;
        if (rotation % 360) {
            cos = Math.cos(rotation * DEG_TO_RAD);
            sin = Math.sin(rotation * DEG_TO_RAD);
        }
        if (skewX || skewY) {
            skewX *= DEG_TO_RAD;
            skewY *= DEG_TO_RAD;
            Matrix2D.multiply(transform, Matrix2D.initialize(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y));
            Matrix2D.multiply(transform, Matrix2D.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0));
        } else {
            Matrix2D.multiply(transform, Matrix2D.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y));
        }
        if (originX || originY) {
            transform[4] -= originX * transform[0] + originY * transform[2];
            transform[5] -= originX * transform[1] + originY * transform[3];
        }
        return transform;
    },

    invert: function (transform) {
        const det = Matrix2D.determinant(transform);

        const a = transform[0];
        const b = transform[1];
        const c = transform[2];
        const d = transform[3];
        const e = transform[4];
        const f = transform[5];

        transform[0] = d / det;
        transform[1] = -b / det;
        transform[2] = -c / det;
        transform[3] = a / det;
        transform[4] = (c * f - d * e) / det;
        transform[5] = -(a * f - b * e) / det;

        return transform
    },

    /**
     * 行列式
     * @param mat
     * @returns {number}
     */
    determinant: function (mat) {
        return mat[0] * mat[3] - mat[1] * mat[2]
    }
};

export default Matrix2D
