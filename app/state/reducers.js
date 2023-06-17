import { combineReducers } from "@reduxjs/toolkit";

import mealReducer from "./reducers/mealReducer";
import shopReducer from "./reducers/shopReducer";

const rootReducer = combineReducers({
    meal: mealReducer,
    shop: shopReducer,
});

export default rootReducer;
