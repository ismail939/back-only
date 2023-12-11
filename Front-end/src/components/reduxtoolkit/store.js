import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import { apiSlice } from "./Slices/apiSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})