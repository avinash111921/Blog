import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
}

const authSlice = createSlice(
    {
        name : "auth",
        initialState,
        reducers : {
            login : (state,action) => { /* state for chnage intial state and action sai milta hai payload */
                state.status = true;
                state.userData = action.payload.userData;
            },
            logout : (state) => {
                state.status = false;
                state.userData = null;
            }
        }
    }
);
/* login and logout are actions  */
export const {login,logout} = authSlice.actions
export default authSlice.reducer;