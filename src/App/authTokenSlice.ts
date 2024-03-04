import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthData = {
    token: string | null,
    email: string | null,
    isLogged?: boolean
}
let initialState = {
    token: null,
    email: null,
    isLogged: false
} as AuthData;

export const authTokenSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthData>) => {
            state = {
                token: action.payload.token,
                email: action.payload.email,
                isLogged: true
            };
            return state;
        },

        logout: (state) => {
            state = {
                token: null,
                email: null,
                isLogged: false
            };
            return state;
        }
    }
});

export const { login, logout } = authTokenSlice.actions

export default authTokenSlice.reducer

