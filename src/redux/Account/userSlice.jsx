import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        User: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        userStart: (state) => {
            state.User = null;
            state.isFetching = true;
            state.error = false;
        },
        userSuccess: (state, action) => {
            state.isFetching = false;
            state.User = action.payload;
        },
        userFailed: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            state.User = null;
            state.isFetching = false;
            state.error = false;
        },
    },
});

export const { userStart, userSuccess, userFailed, userLogout } = userSlice.actions;
export default userSlice.reducer;
