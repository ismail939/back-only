import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import { apiSlice } from "./Slices/apiSlice";
import signUpSlice from "./Slices/signUpSlice";
import paySlice from "./Slices/paySlice";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        signUp: signUpSlice,
        pay: paySlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})