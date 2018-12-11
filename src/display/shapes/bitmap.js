import DisplayObject from "../display-object";

class Bitmap extends DisplayObject {
    constructor(src, done) {
        super();

        if(typeof src === 'string') {
            if(Bitmap.cache[src]) {
                this.image = Bitmap.cache[src];
                this.setBounds(0, 0, this.image.width, this.image.height);
                done && done(this);
            } else {
                const image = new Image();
                image.onload = () => {
                    this.image = image;
                    if(!this.getBounds()) {
                        this.setBounds(0, 0, this.image.width, this.image.height);
                    }
                    Bitmap.cache[src] = this.image;
                    done && done(this);
                }
                image.src = src;
            }
        } else {
            this.image = src;
            this.setBounds(0, 0, this.image.width, this.image.height);
            Bitmap.cache[this.image.src] = this.image;
            done && done(this);
        }
    }

    draw(ctx) {
        if(this.image) {
            const {x, y, width, height} = this.getBounds();
            ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
        }
    }
}

Bitmap.cache = {};

export default Bitmap
