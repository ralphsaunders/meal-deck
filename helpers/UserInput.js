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

    const findDigits = new RegExp(/\d+/);
    let quantity = input.match(findDigits);
    quantity = quantity ? parseInt(quantity[0]) : quantity;

    const findNotDigits = new RegExp(/\D+/);
    const ingredient = input.match(findNotDigits);

    const output = {
        quantity,
        unit: null,
        ingredient: ingredient[0].trim(),
    };

    return output;
}
