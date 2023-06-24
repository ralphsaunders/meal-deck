import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { v4 as uuidv4 } from "uuid";

const entity = createEntityAdapter({
    sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const slice = createSlice({
    name: "shop",
    initialState: entity.getInitialState(),
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
            reducer: entity.addOne,
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
        updateShop: entity.updateOne,
        deleteShop: entity.removeOne,
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, entity.getInitialState);
    },
});

const selectors = entity.getSelectors((state) => state.shop);

export const { selectAll: selectShops, selectById: selectShopById } = selectors;
export const { createShop, updateShop, deleteShop } = slice.actions;
export default slice.reducer;
