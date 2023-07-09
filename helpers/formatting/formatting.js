export const multilineToArray = (input) => input.split("\n");
export const countIngredients = (input) => multilineToArray(input).length;
export const ingredientLabel = (count) =>
    count === 1 ? "Ingredient" : "Ingredients";
