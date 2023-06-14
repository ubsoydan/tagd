import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state: any, action: any) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state: any) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
