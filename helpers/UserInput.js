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
    const units = [
        "tablespoon",
        "teaspoon",
        "tbsp",
        "tsp",
        "cup",
        "c",
        "fluid ounce",
        "fl oz",
        "pint",
        "pt",
        "quart",
        "qt",
        "gallon",
        "gal",
        "milliliter",
        "ml",
        "liter",
        "l",
        "ounce",
        "oz",
        "pound",
        "lb",
        "#",
        "gram",
        "g",
        "kilogram",
        "kg",
        "pinch",
        "dash",
        "drop",
        "dozen",
        "doz",
    ];

    const prepositions = ["of", "per", "in"];
    const adjectives = ["scant", "generous", "heaped"];

    const findPrepositionsAdjectives = new RegExp(
        `\\b(${prepositions.join("|")}|${adjectives.join("|")})\\b`,
        "g"
    );
    const sanitisedInput = input.replace(findPrepositionsAdjectives, "");

    const findDigits = new RegExp(/\d+/);
    let quantity = sanitisedInput.match(findDigits);
    quantity = quantity ? parseInt(quantity[0], 10) : quantity;

    const findNotDigits = new RegExp(/\D+/);
    const ingredient = sanitisedInput.match(findNotDigits);

    const findUnit = new RegExp(`(${units.join("|")})e?s?\\s`);
    let unit = sanitisedInput.match(findUnit);
    if (unit) {
        unit = unit.reduce((a, b) => (a.length <= b.length ? a : b));
        unit = standardiseUnit(unit);
    }

    const output = {
        quantity,
        unit,
        ingredient: ingredient[0].replace(findUnit, "").trim(),
    };

    return output;
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
