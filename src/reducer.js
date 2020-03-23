import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import auth from './reducers/auth';
import common from './reducers/common';
import squabble from './reducers/squabble';
import argument from './reducers/argument';
import comment from './reducers/comment';

export default combineReducers({
    auth,
    common,
    squabble,
    argument,
    comment,
    router: routerReducer
});
