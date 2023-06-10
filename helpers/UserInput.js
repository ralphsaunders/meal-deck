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
        "-",
        "dash",
        "drop",
        "dozen",
        "doz",
    ];

    const prepositions = ["of", "per", "in"];

    const adjectives = ["scant", "generous", "heaped"];

    const findPrepositions = new RegExp(`\\b(${prepositions.join("|")})\\b`);
    const sanitisedInput = input.replace(findPrepositions, "");

    const findDigits = new RegExp(/\d+/);
    let quantity = sanitisedInput.match(findDigits);
    quantity = quantity ? parseInt(quantity[0]) : quantity;

    const findNotDigits = new RegExp(/\D+/);
    const ingredient = sanitisedInput.match(findNotDigits);

    const findUnit = new RegExp(`\\b(${units.join("|")})s?\\b`);
    let unit = sanitisedInput.match(findUnit);
    if (unit) {
        unit = unit.reduce((a, b) => (a.length <= b.length ? a : b));
    }

    const output = {
        quantity,
        unit,
        ingredient: ingredient[0].replace(findUnit, "").trim(),
    };

    return output;
}
