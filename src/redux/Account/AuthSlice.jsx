import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuth: false,
        isLoading: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.user = null;
            state.isLoading = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
