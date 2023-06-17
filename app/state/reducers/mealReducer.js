import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meals: [],
};

const mealSlice = createSlice({
    name: "meal",
    initialState,
    reducers: {
        createMeal: (state, action) => {
            const meal = action.payload;
            state.meals.push(meal);
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
