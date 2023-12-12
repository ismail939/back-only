import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {user:null , token:null},
    name: "authSlice",
    reducers: {
        setCredentials: (state, action) =>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user" , JSON.stringify(state))
        },
        logOut: (state, action) =>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('user')
        }
    }
})

export const { setCredentials  , logOut } = authSlice.actions;
export default authSlice.reducer;

