import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authTokenSlice";

export default configureStore({
    reducer: {
        authData: authReducer
    }
});