import { tokenizeInput } from "./UserInput";

describe("User input helper", () => {
    it("tokenizes strings into terms", () => {
        const terms = tokenizeInput("lorem ipsum dolor");
        expect(terms.quantity).toBeDefined();
        expect(terms.quantity).toBeFalsy();
        expect(terms.unit).toBeDefined();
        expect(terms.unit).toBeFalsy();
        expect(terms.ingredient).toBeDefined();
        expect(terms.ingredient).toBe("lorem ipsum dolor");
    });
});
