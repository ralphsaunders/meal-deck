import { tokenizeInput } from "./UserInput";

describe("User input helper", () => {
    it("tokenizes strings into terms", () => {
        const terms = tokenizeInput("lorem ipsum dolor");
        expect(terms.quantity).toBeFalsy();
        expect(terms.unit).toBeFalsy();
        expect(terms.ingredient).toBe("lorem ipsum dolor");
    });

    it("identifies quantities and ingredients", () => {
        const terms = tokenizeInput("4 hash browns");
        expect(terms.quantity).toBe(4);
        expect(terms.unit).toBeFalsy();
        expect(terms.ingredient).toBe("hash browns");
    });

    it("identifies units", () => {
        const terms = tokenizeInput("3 cups all-purpose flour");
        expect(terms.quantity).toBe(3);
        expect(terms.unit).toBe("cup");
        expect(terms.ingredient).toBe("all-purpose flour");
    });
});
