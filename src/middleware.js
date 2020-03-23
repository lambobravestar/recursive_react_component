import agent from "./agent";
import {REGISTER, LOGIN, LOGOUT, ASYNC_START, ASYNC_END} from "./constants/actionTypes";
import axios from 'axios';

const promiseMiddleware = store => next => action => {
    const currentState = store.getState();
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });
        action.payload
            .then(res => {
                
                action.payload = res.data;
                store.dispatch(action);
                store.dispatch({type: ASYNC_END});
            })
            .catch(error => {
                // const currentState = store.getState();
                action.error = true;
                action.payload = error;
                store.dispatch(action);
            });
        return;
    } else {
        next(action);
    }
};

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN) {
        if (!action.error) {
            window.localStorage.setItem("tokens", JSON.stringify(action.payload));
            agent.setToken(action.payload);
        }
    } else if (action.type === LOGOUT) {
        window.localStorage.setItem("tokens", "");
        agent.setToken(null);
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

export {promiseMiddleware, localStorageMiddleware};
