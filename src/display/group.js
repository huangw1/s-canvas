import DisplayObject from "./display-object";

/**
 * Group is a class that manages a nestable display list.
 */
class Group extends DisplayObject {
    constructor(props) {
        super(props);

        this.children = [];
    }

    clone() {
        console.log('not yet implement.');
    }

}
