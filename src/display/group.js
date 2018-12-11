import DisplayObject from "./display-object";

/**
 * Group is a class that manages a nestable display list.
 */
class Group extends DisplayObject {
    constructor() {
        super();

        this.children = [];
    }

    addChild(child) {
        if(arguments.length > 1) {
            Array.from(arguments).forEach(child => {
                this.addChild(child);
            })
        }
        const parent = child.parent;
        if(parent) {
            parent.removeChildAt(parent.children.indexOf(child));
        }
        this.children.push(child);
        child.parent = this;
    }

    addChildAt(child, index) {
        const parent = child.parent;
        if(parent) {
            parent.removeChildAt(parent.children.indexOf(child));
        }
        this.children.splice(index, 0, child);
    }

    removeChild(child) {
        this.children.forEach((item, i) => {
            if(item.id === child.id) {
                this.children.splice(i--, 1);
            }
        })
    }

    removeChildAt(index) {
        const child = this.children[index];
        if(child) {
            child.parent = null;
            this.children.splice(index, 1);
        }
    }

    clear() {
        this.children.forEach(child => {
            child.parent = null;
        });
        this.children.length = 0;
    }

    destroy() {
        this.clear();
        super.destroy();
    }

    render(ctx) {
        this.children.forEach(child => {
            child.render(ctx);
        })
    }

    clone() {
    }

}

export default Group
