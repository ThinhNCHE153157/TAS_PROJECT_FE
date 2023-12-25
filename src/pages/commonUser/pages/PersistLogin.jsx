import { LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('isAuthenticated', 'true');
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            localStorage.setItem('isAuthenticated', 'false');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}
