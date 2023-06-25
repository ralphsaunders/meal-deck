import pluralize from "pluralize";

import { units, prepositions, adjectives } from "./supported-tokens";

/**
 * @typedef {object} TokenizedIngredient
 * @property {number} quantity - The quantity of the ingredient
 * @property {string} unit - The unit of measure
 * @property {string} ingredient - The ingredient itself
 */

/**
 * Tokenize Input
 *
 * Given user input, will identify quantities, units, and ingredients. E.G:
 *
 * In: "2 heaped tsp of sugar"
 * Out: { "quantity": 2, "unit": "teaspoon", "ingredient": "sugar" }
 * @param { string } input - a single ingredient line from a recipe
 * @returns { TokenizedIngredient } interpreted input
 */
export function tokenizeInput(input) {
    const findPrepositionsAdjectives = new RegExp(
        `\\b(${prepositions.join("|")}|${adjectives.join("|")})\\b`,
        "g"
    );
    const sanitisedInput = input
        .toLowerCase()
        .replace(findPrepositionsAdjectives, "");

    const findDigits = new RegExp(/\d?\/?\d+/);
    let quantity = sanitisedInput.match(findDigits);
    if (quantity && quantity[0].includes("/")) {
        // If user supplied a fraction
        const [numerator, denominator] = quantity[0].split("/");
        quantity = parseInt(numerator, 10) / parseInt(denominator, 10); // Convert to decimal
    } else {
        quantity = quantity ? parseInt(quantity[0], 10) : quantity;
    }

    const findUnit = new RegExp(`(${units.join("|")})\\s`);
    let unit = sanitisedInput.match(findUnit);
    if (unit) {
        unit = unit.reduce((a, b) => (a.length <= b.length ? a : b));
        unit = standardiseUnit(unit);
        unit = pluralize.singular(unit);
    }

    const findNotDigits = new RegExp(/[^\d]\D+/);
    let ingredient = sanitisedInput.match(findNotDigits);
    ingredient = ingredient[0].replace(findUnit, "").trim();

    const output = {
        quantity,
        unit,
        ingredient,
    };

    return output;
}

export function processIngredients(ingredients) {
    return ingredients
        .split("\n")
        .map((i) => tokenizeInput(i))
        .reduce((acc, cur) => {
            const b = pluralize.singular(cur.ingredient);
            const index = acc.findIndex((accumulated) => {
                const a = pluralize.singular(accumulated.ingredient);
                return a === b;
            });

            if (index === -1) {
                // if ingredient not present in accumulator
                acc.push(cur);
            } else {
                acc[index].ingredient = pluralize.plural(b);

                // When both quantities are null, don't make up quantities
                if (acc[index].quantity === null && cur.quantity === null) {
                    return acc;
                } else {
                    // sum quantities of matching ingredients
                    acc[index].quantity += cur?.quantity ?? 1;
                }
            }
            return acc;
        }, []);
}

/**
 * Standardise Unit
 *
 * Users may use abbreviated units in their recipes. This fn maps abbreviations
 * to units so the system is able to interpret user input in a standard way.
 * @param {string} unitInput - the unit as input by the user
 * @returns {string} standardised output for unitInput
 */
function standardiseUnit(unitInput) {
    let output = unitInput;

    switch (unitInput) {
        case "tbsp":
            output = "tablespoon";
            break;
        case "tsp":
            output = "teaspoon";
            break;
        case "c":
            output = "cup";
            break;
        case "fl oz":
            output = "fluid ounce";
            break;
        case "pt":
            output = "pint";
            break;
        case "qt":
            output = "quart";
            break;
        case "gal":
            output = "gallon";
            break;
        case "ml":
            output = "milliliter";
            break;
        case "l":
            output = "litre";
            break;
        case "oz":
            output = "ounce";
            break;
        case "lb":
        case "#":
            output = "pound";
            break;
        case "g":
            output = "gram";
            break;
        case "kg":
            output = "kilogram";
            break;
        case "doz":
            output = "dozen";
            break;
    }

    return output;
}
