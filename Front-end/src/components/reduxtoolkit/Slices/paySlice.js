import { createSlice } from "@reduxjs/toolkit";
export const paySlice = createSlice({
    initialState: sessionStorage.getItem('pay') ? JSON.parse(localStorage.getItem('pay')) :{bookingTime:[] , totalPrice:0 , date:"" , type:"", roomid: "1"},
    name: "paySlice",
    reducers: {
        setPayData: (state, action) =>{
            state.bookingTime = action.payload.bookingTime;
            state.totalPrice = action.payload.totalPrice;
            state.date = action.payload.date;
            state.type = action.payload.type;
            state.roomid = action.payload.roomid;
            sessionStorage.setItem("pay" , JSON.stringify(state))
        }, removePayData: (state, action) =>{
            state.bookingTime = [];
            state.totalPrice = 0;
            state.date = "";
            state.type = "";
            state.roomid = "";
            sessionStorage.removeItem('pay')
        }
    }
})

export const { setPayData} = paySlice.actions;
export default paySlice.reducer;