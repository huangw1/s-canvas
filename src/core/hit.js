import QuadTree from "../base/quadtree";
import Group from "../display/group";

const DEFAULT_SIZE = 2;

class Hit {
    constructor(stage) {
        const canvas = document.createElement('CANVAS');
        canvas.width = DEFAULT_SIZE;
        canvas.height = DEFAULT_SIZE;
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        this.stage = stage;
        this.quadTree = new QuadTree({
            x     : 0,
            y     : 0,
            width : stage.width,
            height: stage.height
        });
    }

    _hitPix(event) {
        const {quadTree, stage, ctx} = this;
        const target = {
            x     : event.stageX,
            y     : event.stageY,
            width : DEFAULT_SIZE,
            height: DEFAULT_SIZE
        };

        ctx.clearRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE);
        quadTree.clear();
        this._insertObjects(quadTree, stage.children);
        const children = this._getObjectsInQuad(quadTree, target);
        for(let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            child.render(ctx, event);
            const alpha = ctx.getImageData(0, 0, 1, 1).data[3];
            if (alpha > 0) {
                return child;
            }
        }
    }

    _insertObjects(quadTree, children) {
        children.forEach(child => {
            if(child instanceof Group) {
                this._insertObjects(quadTree, child.children);
            } else {
                if(child.isVisible) {
                    const bound = child.getTransformedBounds();
                    bound.source = child;
                    quadTree.insert(bound);
                }
            }
        })
    }

    /**
     * 获取 event 所属 quad
     */
    _getObjectsInQuad(quadTree, target) {
        const result = [];
        quadTree.findObjects(result, target);
        return result.map(item => item.source);
    }
}

export default Hit
