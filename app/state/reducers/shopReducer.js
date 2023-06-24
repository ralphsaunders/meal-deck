import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { v4 as uuidv4 } from "uuid";

const shopAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const shopSlice = createSlice({
    name: "shop",
    initialState: shopAdapter.getInitialState(),
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
            reducer: shopAdapter.addOne,
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
        updateShop: shopAdapter.updateOne,
        deleteShop: shopAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, shopAdapter.getInitialState);
    },
});

const shopSelectors = shopAdapter.getSelectors((state) => state.shop);

export const { selectAll: selectShops, selectById: selectShopById } =
    shopSelectors;

export const { createShop, updateShop, deleteShop } = shopSlice.actions;

export default shopSlice.reducer;
