import { detectMeasure } from "./UserInput";

describe("User input helper", () => {
    it("returns length 3", () => {
        expect(detectMeasure().length).toBe(3);
    });
});
