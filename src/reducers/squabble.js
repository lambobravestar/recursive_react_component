import {
    ADD_SQUABBLE, 
    SQUABBLELIST_LOADED, 
    SQUABBLE_CHALLENGE,
    SQUABBLE_SELECT, 
    ASYNC_END
} from '../constants/actionTypes';

const defaultState = {
    squabbleList: [
        {
            _id: "5e6b4c6d03fa99640ce98919",
            thesis: "McDonald Is The best",
            author_id: "master",
            date: "2020-03-12T21:00:00.000Z",
            anti_thesis: "Burger King Is The best",
            challenger_id: "test",
            status: "In-Progress",
            thesis_img: "url",
            anti_thesis_img: "this",
            expiration_date: "2020-04-03T21:00:00.000Z",
            __v: 0
        }, {
            vote: 0,
            _id: "5e6b698d1cba1a7324b19f65",
            thesis: "Adidas is the best",
            author_id: "test1",
            date: "2020-03-12T21:00:00.000Z",
            anti_thesis: null,
            challenger_id: null,
            status: "Open",
            thesis_img: "url",
            anti_thesis_img: "anti-url",
            expiration_date: "2020-04-03T21:00:00.000Z",
            __v: 0
        }
    ]
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case ADD_SQUABBLE:
            return {
                ...state,
                squabbleList: action.error
                    ? (state.squabbleList || [])
                    : (state.squabbleList || []).concat([action.payload])
            }
        case SQUABBLELIST_LOADED:
            return {
                squabbleList: action.error
                    ? null
                    : action.payload
            }
        case SQUABBLE_CHALLENGE:
            return {
                ...state,
                squabbleList: action.error
                    ? state.squabbleList
                    : state.squabbleList.map(squabble => {
                            if (squabble._id === action.payload._id) {
                                return action.payload;
                            } else 
                                return squabble;
                            }
                        )
            }
        case SQUABBLE_SELECT:
            return {
                ...state,
                selectedSquabbleId: action.payload.selectedSquabbleId,
                squabbleAuthor : action.payload.squabbleAuthor,
                challanger: action.payload.challanger
            }
        case ASYNC_END:
            return {
                ...state,
                inProgress: false
            }
        default:
            return state;
    }
};
