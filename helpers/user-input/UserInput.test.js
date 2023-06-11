import { tokenizeInput } from "./UserInput";
import Fixture from "./UserInput.fixture.json";

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

    it("ignores prepositions", () => {
        const terms = tokenizeInput("1 cup of brown sugar");
        expect(terms.quantity).toBe(1);
        expect(terms.unit).toBe("cup");
        expect(terms.ingredient).toBe("brown sugar");
    });

    it("ignores adjectives", () => {
        const terms = tokenizeInput("2 heaped teaspoons of sugar");
        expect(terms.quantity).toBe(2);
        expect(terms.unit).toBe("teaspoon");
        expect(terms.ingredient).toBe("sugar");
    });

    it("passes against known cases", () => {
        Fixture.forEach((testcase) => {
            const terms = tokenizeInput(testcase.input);
            expect(terms.quantity).toBe(testcase.quantity);
            expect(terms.unit).toBe(testcase.unit);
            expect(terms.ingredient).toBe(testcase.ingredient);
        });
    });
});
