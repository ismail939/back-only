import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {user:null , token:null},
    name: "authSlice",
    reducers: {
        setCredentials: (state, action) =>{
            state.user = action.payload.user;
            localStorage.setItem("user" , JSON.stringify(state))
        },
        logOut: (state, action) =>{
            state.user = null;
            state.token = null;
        }
    }
})

export const { setCredentials  , logOut } = userSlice.actions;
export default userSlice.reducer;