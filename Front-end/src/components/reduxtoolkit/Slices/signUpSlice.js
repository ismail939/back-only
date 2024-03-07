import { createSlice } from "@reduxjs/toolkit";
export const signUpSlice = createSlice({
    initialState: {
        firstName: "",
        lastName: "",
        email: "",
        phonenumber: "",
        password: "",
        username: "",
        usertype:""
    },
    name: "sign-up Slice",
    reducers: {
        setData: (state, action) =>{
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.phonenumber = action.payload.phonenumber;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.usertype = action.payload.usertype;
            console.log("Data Added Successfully")
        },
        removeData: (state, action) => {
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.phonenumber = "";
            state.username = "";
            state.password = "";
            state.usertype = "";
        }
    }
})

export const { setData  , removeData } = signUpSlice.actions;
export default signUpSlice.reducer;