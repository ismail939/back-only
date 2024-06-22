import { createSlice } from "@reduxjs/toolkit";
export const signUpSlice = createSlice({
    initialState: sessionStorage.getItem('sign-up') ? JSON.parse(sessionStorage.getItem('sign-up')) : {
        email: "",
        usertype:""
    },
    name: "sign-up Slice",
    reducers: {
        setData: (state, action) =>{
            state.email = action.payload.email;
            state.usertype = action.payload.usertype;
            sessionStorage.setItem("sign-up" , JSON.stringify(state))
        },
        removeData: (state, action) => {
            state.email = "";
            state.usertype = "";
            sessionStorage.removeItem('sign-up')
        }
    }
})

export const { setData  , removeData } = signUpSlice.actions;
export default signUpSlice.reducer;