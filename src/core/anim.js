import Tween from "../tween";

const queue = [];

export const add = (target) => {
    return new To(target);
};

export const update = () => {
    if(queue.length) {
        queue.forEach(tween => {
            tween.compute();
        });
    }
};

const animatingProperties = [
    'x',
    'y',
    'scale',
    'scaleX',
    'scaleY',
    'rotation',
    'skewX',
    'skewY',
    'originX',
    'originY',
    'alpha'
];

const optionProperties = [
    'easing',
    'duration',
    'delay',
    'start',
    'finish'
]

class To {
    constructor(target) {
        this.target = target;
        this.from = {};
        this.to = {};
        this.options = {};

        animatingProperties.forEach(animatingProperty => {
            this[animatingProperty] = (value) => {
                this.from[animatingProperty] = this.target[animatingProperty];
                this.to[animatingProperty] = value;
                return this;
            }
        });
        optionProperties.forEach(optionProperty => {
            this[optionProperty] = (value) => {
                this.options[optionProperty] = value;
                return this;
            }
        });
    }

    to(properties) {
        for (let key in properties) {
            this[key](properties[key]);
        }
    }

    update(callback) {
        this.options.update = (properties) => {
            for (let key in properties) {
                this.target[key] = properties[key];
            }
            callback(properties);
        };
        return this;
    }

    create() {
        queue.push(new Tween({
            update: (properties) => {
                for(let key in properties) {
                    this.target[key] = properties[key];
                }
            },
            ...this.options,
            from: this.from,
            to: this.to
        }));
    }
}
