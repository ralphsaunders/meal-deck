import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const entity = createEntityAdapter({
    sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const slice = createSlice({
    name: "meal",
    initialState: entity.getInitialState(),
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
            reducer: entity.addOne,
            prepare: ({ name, ingredients }) => {
                const id = uuidv4();
                const timestamp = Math.floor(Date.now() / 1000);

                return {
                    payload: {
                        id,
                        timestamp,
                        name,
                        ingredients,
                    },
                };
            },
        },
        updateMeal: entity.updateOne,
        deleteMeal: entity.removeOne,
    },
});

const selectors = entity.getSelectors((state) => state.meal);

export const {
    selectAll: selectMeals,
    selectById: selectMealById,
    selectTotal: totalMeals,
} = selectors;
export const { createMeal, updateMeal, deleteMeal } = slice.actions;
export default slice.reducer;
