class ImageManage {

    imageList = [];

    num = 0;

    addImage(images) {
        images = Array.isArray(images) ? images : [images];
        images.forEach((item) => {
            const image = new Image();
            image.onload = () => {
                this.num += 1;
            }
            image.onerror = () => {
                this.num += 1;
            }
            image.src = item.src;
            item.image = image;
            this.imageList.push(item);
        })
    }

    getImage(name) {
        return this.imageList.find(item => item.name === name);
    }

    ready() {
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (this.num === this.imageList.length) {
                    clearInterval(timer);
                    resolve()
                }
            }, 50)
        })
    }
}

export default ImageManage