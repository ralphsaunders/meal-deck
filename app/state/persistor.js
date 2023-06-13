// persistor.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import rootReducer from "./reducers";

// Configure Redux Persist
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    // Optionally, you can whitelist or blacklist specific reducers
    // to include or exclude them from persistence.
    // whitelist: ['reducerName'],
    // blacklist: ['reducerName'],
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
    reducer: persistedReducer,
    // other configuration options
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                /**
                 * As per guidance
                 * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
                 */
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

// Create and export the Redux Persistor
export const persistor = persistStore(store);

export default store;
