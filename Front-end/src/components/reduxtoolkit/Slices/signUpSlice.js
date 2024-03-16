import { createSlice } from "@reduxjs/toolkit";
export const signUpSlice = createSlice({
    initialState: {
        email: "",
        usertype:""
    },
    name: "sign-up Slice",
    reducers: {
        setData: (state, action) =>{
            state.email = action.payload.email;
            state.usertype = action.payload.usertype;
        },
        removeData: (state, action) => {
            state.email = "";
            state.usertype = "";
        }
    }
})

export const { setData  , removeData } = signUpSlice.actions;
export default signUpSlice.reducer;