import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import { createBlacklistFilter } from 'redux-persist-transform-filter';
// eslint-disable-next-line import/namespace
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from 'redux-persist'
import cartSlice from "@/store/slices/cart.slice";

const rootReducer = combineReducers({
    cart: cartSlice
})

// const saveSubsetBlacklistFilter = createBlacklistFilter('auth', ['loginPending', 'getProfilePending']);

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['cart'],
    // transforms: [saveSubsetBlacklistFilter]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            }
        })
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;