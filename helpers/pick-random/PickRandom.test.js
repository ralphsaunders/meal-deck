import { pickRandom } from "./PickRandom";

describe("pickRandom fn", () => {
    it("is non-destructive", () => {
        const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const testOrder = testArray.join("|");
        const output = pickRandom(testArray, 3);
        const checkArrayOrder = testArray.join("|");

        expect(testOrder).toBe(checkArrayOrder);
    });

    it("picks the passed amount", () => {
        const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const output = pickRandom(testArray, 3);

        expect(output.length).toBe(3);
        expect(testArray.length).toBe(10);
    });

    it("errors when count is out of bounds", () => {
        const testArray = [1, 2, 3];

        expect(() => {
            const output = pickRandom(testArray, 4);
        }).toThrow("The argument count was outside the bounds of the array");

        expect(() => {
            const output = pickRandom(testArray, -1);
        }).toThrow("The argument count was outside the bounds of the array");
    });

    it("errors when count is 0", () => {
        const testArray = [1, 2, 3];

        expect(() => {
            const output = pickRandom(testArray, 0);
        }).toThrow("The argument count was 0");
    });
});
