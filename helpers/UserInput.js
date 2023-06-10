export function tokenizeInput(input) {
    const measures = [
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

    const output = {
        quantity: null,
        unit: null,
        ingredient: input,
    };

    return output;
}
