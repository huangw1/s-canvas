import Graphic from "../graphic";

class Text extends Graphic {
    constructor(text, options) {
        super();

        this.text = text;
        this.options = options || {};
        this.options = {
            font        : '12px sans-serif',
            color       : 'black',
            textAlign   : 'left',
            textBaseline: 'top',
            maxWidth    : Number.MAX_VALUE,
            ...this.options
        };
        this._ctx = document.createElement('CANVAS').getContext('2d');

        this._buildCmd();
    }

    _buildCmd() {
        const {font, color, textAlign, textBaseline, maxWidth} = this.options;
        const {text, textWidth} = this._getEllipsisTextInfo(this.text, maxWidth);
        this.font(font);
        this.textAlign(textAlign);
        this.textBaseline(textBaseline);
        this.fillStyle(color);
        this.fillText(text, 0, 0);

        this.setBounds(...this._getBounds(text, textWidth));
    }

    _getBounds(text, textWidth) {
        const {textAlign, textBaseline} = this.options;
        const offsetX = {start: 0, left: 0, center: -0.5, end: -1, right: -1};
        const offsetY = {top: 0, hanging: -0.01, middle: -0.4, alphabetic: -0.8, ideographic: -0.85, bottom: -1};
        const width = textWidth;
        const height = this._getLineHeight();
        const x = offsetX[textAlign] * width;
        const y = offsetY[textBaseline] * height;
        return [x, y, width, height];
    }

    _prepContext(ctx) {
        const {font, textAlign, textBaseline} = this.options;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
    }

    _measureTextWidth(text) {
        const ctx = this.stage && this.stage.ctx || this._ctx;
        ctx.save();
        this._prepContext(ctx);
        const width = ctx.measureText(text).width;
        ctx.restore();
        return width;
    }

    _getLineHeight() {
        return this._measureTextWidth('M') * 1.2;
    }

    _getEllipsisTextInfo(text, maxWidth) {
        let textWidth = this._measureTextWidth(text);
        let ellipsis = '...';
        let ellipsisWidth = this._measureTextWidth(ellipsis);
        if(textWidth <= maxWidth || textWidth <= ellipsisWidth) {
            return {text, textWidth};
        }
        let length = text.length;
        while (textWidth >= (maxWidth - ellipsisWidth) && length-- > 0) {
            text = text.substring(0, length);
            textWidth = this._measureTextWidth(text);
        }
        return {text: text + ellipsis, textWidth: textWidth + ellipsisWidth};
    }
}

export default Text
