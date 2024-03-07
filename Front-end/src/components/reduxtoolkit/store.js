import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import { apiSlice } from "./Slices/apiSlice";
import signUpSlice from "./Slices/signUpSlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        signUp: signUpSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})