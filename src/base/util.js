export const noop = () => {
};

export const textEllipsis = (ctx, text, maxWidth) => {
    let textWidth = ctx.measureText(text).width;
    let ellipsis = '...';
    let ellipsisWidth = ctx.measureText(ellipsis).width;
    if(textWidth <= maxWidth || textWidth <= ellipsisWidth) {
        return text;
    }
    let length = text.length;
    while (textWidth >= (maxWidth - ellipsisWidth) && length-- > 0) {
        text = text.substring(0, length);
        textWidth = ctx.measureText(text).width;
    }
    return text + ellipsis;
};
