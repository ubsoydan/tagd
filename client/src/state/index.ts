import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authProps {
    username: string | null | undefined;
}

const initialState: authProps | null = {
    username: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<authProps | null>) => {
            state.username = action.payload?.username;
        },
        setLogout: (state) => {
            state.username = null;
        },
    },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
