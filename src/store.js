import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import {promiseMiddleware, localStorageMiddleware} from './middleware';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {logger} from 'redux-logger'
import reducer from './reducer'


export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);
const getMiddleware = () => {
    if (process.env.NODE_ENV === 'production') {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
    } else {
        return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, logger);
    }
}

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));