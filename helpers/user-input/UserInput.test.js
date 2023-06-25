import { tokenizeInput, processIngredients } from "./UserInput";
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

    it("normalizes case", () => {
        const terms = tokenizeInput("2 Heaped tsp of SuGar");
        expect(terms.quantity).toBe(2);
        expect(terms.unit).toBe("teaspoon");
        expect(terms.ingredient).toBe("sugar");
    });

    it("passes against known testcases", () => {
        Fixture.forEach((testcase) => {
            const terms = tokenizeInput(testcase.input);
            expect(terms.quantity).toBe(testcase.quantity);
            expect(terms.unit).toBe(testcase.unit);
            expect(terms.ingredient).toBe(testcase.ingredient);
        });
    });
});
describe("Ingredients processor", () => {
    it("handles multi-line input", () => {
        const input = "Tomato\n2 Onions\n4 Radishes";
        const list = processIngredients(input);
        expect(list.length).toBe(3);
    });

    it("tokenizes each line", () => {
        const input = "Tomato\n2 Onions\n40g Radishes";
        const list = processIngredients(input);

        expect(list[0].quantity).toBe(null);
        expect(list[0].unit).toBe(null);
        expect(list[0].ingredient).toBe("tomato");

        expect(list[1].quantity).toBe(2);
        expect(list[1].unit).toBe(null);
        expect(list[1].ingredient).toBe("onions");

        expect(list[2].quantity).toBe(40);
        expect(list[2].unit).toBe("gram");
        expect(list[2].ingredient).toBe("radishes");
    });

    it("deduplicates ingredients", () => {
        const input = "2 Bananas\n3 Bananas";
        const list = processIngredients(input);

        expect(list.length).toBe(1);
        expect(list[0].quantity).toBe(5);
    });

    it("deduplicates mixed-case ingredients", () => {
        const input = "2 Bananas\n3 bananas\n4 BaNaNaS";
        const list = processIngredients(input);

        expect(list.length).toBe(1);
        expect(list[0].quantity).toBe(9);
    });

    it("deduplicates plural ingredients", () => {
        const input = "2 Bananas\n1 Banana";
        const list = processIngredients(input);

        expect(list.length).toBe(1);
        expect(list[0].quantity).toBe(3);
        expect(list[0].ingredient).toBe("bananas");
    });

    it("deduplicates ingredients with missing quantities", () => {
        const input = "2 Bananas\nBanana";
        const list = processIngredients(input);

        expect(list.length).toBe(1);
        expect(list[0].quantity).toBe(3);
        expect(list[0].ingredient).toBe("bananas");
    });

    it("won't create quantities where there are none", () => {
        const input = "Bananas\nBanana";
        const list = processIngredients(input);

        expect(list.length).toBe(1);
        expect(list[0].quantity).toBe(null);
        expect(list[0].ingredient).toBe("bananas");
    });
});
