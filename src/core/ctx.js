import Matrix2D from "../base/matrix2d";

/**
 * canvas context wrapper
 */
class Ctx {

    constructor(ctx) {
        this.ctx = ctx;
        this.matrix = Matrix2D.initializeWithDefault();
        this.matrixStack = [];
    }

    save() {
        this.ctx.save();
        this.matrixStack.push(this.matrix);
        this.matrix = Matrix2D.multiply(Matrix2D.initializeWithDefault(), this.matrix);
    }

    restore() {
        this.ctx.restore();
        this.matrix = this.matrixStack.pop();
    }

    setMatrix(matrix) {
        this.setTransform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }

    getMatrix() {
        return this.matrix;
    }

    setTransform(a, b, c, d, e, f) {
        this.ctx.setTransform(a, b, c, d, e, f);
    }

    transform(a, b, c, d, e, f) {
        const matrix = [a, b, c, d, e, f];
        this.matrix = Matrix2D.multiply(this.matrix, matrix);
    }

    translate(x, y) {
        this.ctx.translate(x, y);
        this.matrix = Matrix2D.translate(this.matrix, x, y);
    }

    scale(dx, dy) {
        this.ctx.scale(dx, dy);
        this.matrix = Matrix2D.scale(this.matrix, dx, dy);
    }

    rotate(angle) {
        this.ctx.rotate(angle);
        this.matrix = Matrix2D.rotate(this.matrix, angle);
    }

    getCoordinate(coordinate) {
        return Matrix2D.transform2D(this.matrix, coordinate);
    }
}

export default (ctx) => {
    return Object.assign(ctx, new Ctx(ctx))
}
