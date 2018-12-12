import Tween from "../tween";

const queue = [];

export const add = (target) => {
    return new To(target);
};

export const removeFinished = () => {
    queue.forEach((tween, i) => {
        if(tween.hasFinished) {
            queue.splice(i--, 1);
        }
    })
};

export const update = () => {
    if(queue.length) {
        removeFinished();
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
    'start'
]

class To {
    constructor(target) {
        this.target = target;
        this.current = 0;
        this.cmdConfigurations = [{from: {}, to: {}, options: {}}];

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

    get from() {
        return this.cmdConfigurations[this.current].from;
    }

    get to() {
        return this.cmdConfigurations[this.current].to;
    }

    get options() {
        return this.cmdConfigurations[this.current].options;
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

    finish(callback) {
        this.options.finish = (properties) => {
            callback(properties);
        };
        this.current += 1;
        this.cmdConfigurations.push({from: {}, to: {}, options: {}});
        return this;
    }

    create() {
        queue.push(new Tween(this.cmdConfigurations.map(cmdConfiguration => {
            return {
                update: (properties) => {
                    for(let key in properties) {
                        this.target[key] = properties[key];
                    }
                },
                ...cmdConfiguration.options,
                from: cmdConfiguration.from,
                to: cmdConfiguration.to
            }
        })));
    }
}
