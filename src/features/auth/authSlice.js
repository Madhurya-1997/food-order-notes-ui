import { createSlice } from "@reduxjs/toolkit"


// state ={
//     auth: {
//         accessToken: null
//     }
// }

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken: null },
    reducers: {
        setCredentials: (state, action) => {
            state.accessToken = action.payload;
        },
        logOut: (state, action) => {
            state.accessToken = null;
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentAccessToken = state => state.auth.accessToken;