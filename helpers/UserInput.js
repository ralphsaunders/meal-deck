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

    const adjectives = ["scant", "generous", "heaped"];

    const findDigits = new RegExp(/\d+/);
    let quantity = input.match(findDigits);
    quantity = quantity ? parseInt(quantity[0]) : quantity;

    const findNotDigits = new RegExp(/\D+/);
    const ingredient = input.match(findNotDigits);

    const findUnit = new RegExp(`\\b(${units.join("|")})s?\\b`);
    let unit = input.match(findUnit);
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
