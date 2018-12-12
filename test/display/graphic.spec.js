import Graphic from "../../src/display/graphic";

describe("Graphic", () => {
    it("Graphic proxy method.", () => {
        // your test

        const graphic = new Graphic();
        expect(graphic.cmds.length).toEqual(0);

        graphic.fillRect(0, 0, 20, 20);
        expect(graphic.cmds.length).toEqual(1);
        expect(graphic.cmds[0][0]).toEqual('fillRect');
    });
});
