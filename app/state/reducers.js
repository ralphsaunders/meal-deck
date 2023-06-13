import { combineReducers } from "@reduxjs/toolkit";

import mealReducer from "./reducers/mealReducer";

const rootReducer = combineReducers({
    meal: mealReducer,
});

export default rootReducer;
