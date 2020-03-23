import {
    ARGUMENTLIST_LOADED, 
    ANTI_ARGUMENTLIST_LOADED,
    ARGUMENT_SUBMIT,
    ANTI_ARGUMENT_SUBMIT,
    ARGUMENT_SELECT,
    ASYNC_END
} from '../constants/actionTypes';

const defaultState = {
    argumentList: [],
    anti_argumentList: []
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case ASYNC_END:
            return {
                ...state,
                inProgress: false
            };
        case ARGUMENTLIST_LOADED:
            return {
                ...state,
                argumentList: action.error
                    ? (state.argumentList || [])
                    : (state.argumentList || []).filter(arg => {
                        if(arg && arg._id)
                            return arg._id !== (action.payload[0] ? action.payload[0]._id : null);
                        else return true;
                        }).concat(action.payload)
            }
        case ANTI_ARGUMENTLIST_LOADED:
            return  {
                ...state,
                anti_argumentList: action.error
                    ? state.anti_argumentList
                    : state.anti_argumentList.filter(arg => {
                        if(arg)
                            return arg._id !== (action.payload[0] ? action.payload[0]._id : null);
                        else return true;
                        }).concat(action.payload)
            }
        case ARGUMENT_SUBMIT:
            return {
                ...state,
                argumentList : action.error ? state.argumentList :state.argumentList.concat(action.payload)
            }
        case ANTI_ARGUMENT_SUBMIT:
            return {
                ...state,
                anti_argumentList : action.error ? state.anti_argumentList : state.anti_argumentList.concat(action.payload)
            }
        // case ARGUMENT_SELECT:
        //     return {
        //         ...state,
        //         selectedArgumentId : action.payload.selectedArgumentId
        //     }
        default:
            return state;
    }
};
