/**
 * QuadTree - 四叉树 - 优化碰撞检测
 * The quadrant indexes are numbered as below:
 *     |
 *  1  |  0
 * ----+----
 *  2  |  3
 *     |
 */
class QuadTree {
    constructor(bounds, level, maxObj, maxLevel) {
        this.bounds = bounds;
        this.level = level || 0;
        this.maxObj = maxObj || 10;
        this.maxLevel = maxLevel || 5;
        this.objects = [];
        this.nodes = [];
    }

    clear() {
        this.nodes.forEach(node => node.clear());
        this.objects = [];
        this.nodes = [];
    }

    split() {
        const level = this.level;
        const subWidth = (this.bounds.width / 2) | 0;
        const subHeight = (this.bounds.height / 2) | 0;

        this.nodes[0] = new QuadTree({
            x     : this.bounds.x + subWidth,
            y     : this.bounds.y,
            width : subWidth,
            height: subHeight
        }, level + 1);

        this.nodes[1] = new QuadTree({
            x     : this.bounds.x,
            y     : this.bounds.y,
            width : subWidth,
            height: subHeight
        }, level + 1);

        this.nodes[2] = new QuadTree({
            x     : this.bounds.x,
            y     : this.bounds.y + subHeight,
            width : subWidth,
            height: subHeight
        }, level + 1);

        this.nodes[3] = new QuadTree({
            x     : this.bounds.x + subWidth,
            y     : this.bounds.y + subHeight,
            width : subWidth,
            height: subHeight
        }, level + 1);
    }

    getIndex(obj) {
        let index = -1;
        const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
        const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

        const topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
        const bottomQuadrant = (obj.y > horizontalMidpoint);

        if (obj.x < verticalMidpoint &&
            obj.x + obj.width < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            }
            else if (bottomQuadrant) {
                index = 2;
            }
        } else if (obj.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            }
            else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    }

    insert(obj) {
        if (Array.isArray(obj)) {
            obj.forEach(o => this.insert(o));
            return;
        }

        if (this.nodes.length) {
            const index = this.getIndex(obj);
            if (index !== -1) {
                this.nodes[index].insert(obj);
                return;
            }
        }

        this.objects.push(obj);
        if (this.objects.length > this.maxObj && this.level < this.maxLevel) {
            if (!this.nodes.length) {
                this.split();
            }

            let i = 0;
            while (i < this.objects.length) {
                const index = this.getIndex(this.objects[i]);
                if (index !== -1) {
                    this.nodes[index].insert((this.objects.splice(i, 1))[0]);
                } else {
                    i++;
                }
            }
        }
    }

    findObjects(result, obj) {
        const index = this.getIndex(obj);
        if (index !== -1 && this.nodes.length) {
            this.nodes[index].findObjects(result, obj);
        }
        this.objects.forEach(object => result.push(object));
        return result;
    }

    getAllObjects(result) {
        this.nodes.forEach(node => node.getAllObjects(result));
        this.objects.forEach(object => result.push(object));
        return result;
    }
}

export default QuadTree
