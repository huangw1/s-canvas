import DisplayObject from "../../src/display/display-object";

describe("DisplayObject", () => {
    it("DisplayObject getTransformedBounds method.", () => {
        // your test

        const displayObject = new DisplayObject();
        displayObject.x = -28;
        displayObject.y =  -35;
        displayObject.rotation = -60;
        displayObject.setBounds(-28, -35, 152, 128);
        const bound = displayObject.getTransformedBounds();
        expect(bound.x === -44.31088913245536).toBeTruthy();
        expect(bound.y === -124.88715006927039).toBeTruthy();
        expect(bound.width === 186.85125168440817).toBeTruthy();
        expect(bound.height === 195.6358613752347).toBeTruthy();
    });
});
