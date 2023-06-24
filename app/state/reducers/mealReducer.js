import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    meals: [],
};

const mealSlice = createSlice({
    name: "meal",
    initialState,
    reducers: {
        /**
         * Create Meal
         *
         * Create a new meal by passing a name and ingredients.
         *
         * Example usage:
         *
         *      dispatch(createMeal({
         *          name: "Spag Bol",
         *          ingredients: "1 Tin Tomatoes\rnMince\rnSpaghetti"
         *      }));
         */
        createMeal: {
            reducer: (state, action) => {
                const meal = action.payload;
                state.meals.push(meal);
            },
            prepare: ({ name, ingredients }) => {
                const id = uuidv4();
                return {
                    payload: {
                        id,
                        name,
                        ingredients,
                    },
                };
            },
        },
        updateMeal: (state, action) => {
            const { id } = action.payload;
            const index = state.meals.findIndex((meal) => meal.id === id);
            state.meals[index] = action.payload;
        },
        deleteMeal: (state, action) => {
            const id = action.payload;
            state.meals = state.meals.filter((meal) => meal.id !== id);
        },
    },
});

export const { createMeal, updateMeal, deleteMeal } = mealSlice.actions;

export default mealSlice.reducer;
