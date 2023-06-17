import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shops: [],
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        createShop: (state, action) => {
            const shop = action.payload;
            state.shops.push(shop);
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
