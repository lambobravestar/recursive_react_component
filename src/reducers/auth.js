import {
    ASYNC_START,
    LOGIN,
    REGISTER
} from '../constants/actionTypes'

const auth = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                error: action.error ? action.payload : null
            };
        case ASYNC_START:
            if(action.subtype === LOGIN || action.type === REGISTER ) {
                return {...state, inProgress: true };
            } else return state;
        default:
            return state;
    }
}

export default auth;