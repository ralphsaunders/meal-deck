import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    shops: [],
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        /**
         * Create Shop
         *
         * Create a new shop by passing a list of meal IDs.
         *
         * Example usage:
         *
         *      dispatch(createShop([
         *           "meal-uuid-1",
         *           "meal-uuid-2",
         *      ]))
         */
        createShop: {
            reducer: (state, action) => {
                const newShop = action.payload;
                state.shops.push(newShop);
                state.shops.sort((a, b) => b.timestamp - a.timestamp);
            },
            prepare: (meals) => {
                const id = uuidv4();
                const timestamp = Math.floor(Date.now() / 1000);

                return {
                    payload: {
                        id,
                        timestamp,
                        meals,
                    },
                };
            },
        },
        updateShop: (state, action) => {
            const { id } = action.payload;
            const index = state.shops.findIndex((shop) => shop.id === id);
            state.shops[index] = action.payload;
        },
        deleteShop: (state, action) => {
            const id = action.payload;
            state.shops = state.shops.filter((shop) => shop.id !== id);
        },
    },
});

export const { createShop, updateShop, deleteShop } = shopSlice.actions;

export default shopSlice.reducer;
