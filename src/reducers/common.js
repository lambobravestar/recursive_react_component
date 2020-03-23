import {
    APP_LOADED,
    LOGIN,
    REGISTER,
    ASYNC_END
} from '../constants/actionTypes';

const defaultState = {};
export default(state = defaultState, action) => {
    switch (action.type) {
        case APP_LOADED:
            return {
                ...state,
                tokens: action.payload || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.username : null
            };
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                error: action.error? action.payload : null,
                redirectTo: action.error ? null : '/home',
                token: action.error ? null : action.payload,
                currentUser: action.error ? null : action.payload && action.payload.username
            };
        case ASYNC_END:
            return {
                ...state,
                inProgress: false
            }
        default:
            return state;
    }
};
    