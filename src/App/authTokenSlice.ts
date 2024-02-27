import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState = null;

export const authTokenSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state = action.payload;
            return state;
        },

        logout: (state) => {
            state = null;
            return state;
        }
    }
});

export const { login, logout } = authTokenSlice.actions

export default authTokenSlice.reducer

