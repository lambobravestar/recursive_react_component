import {
    COMMENTLIST_LOADED,
    COMMENTCHILDLIST_LOAD,
    COMMENTCHILDLIST_UNLOAD,
    COMMENT_SUBMIT
} from '../constants/actionTypes';
import { compose } from 'redux';

const defaultState = {
    comments : [
        // {
        //     _id: "5e6bcda6a62e553ab833AAAA",
        //     author_id: "test",
        //     comment: "You are lier, Meat is bad",
        //     comment_id: "",
        //     argument_id: "5e6ba7921cba1a7324b19f77",
        //     date: "2020-03-12T21:00:00.000Z",
        //     __v: 0,
        //     child: [
        //         {
        //             _id: "5e6bcda6a62e553ab83bbbb1",
        //             author_id: "master",
        //             comment: "How do you know meat is not good?",
        //             comment_id: "5e6bcda6a62e553ab833AAAA",
        //             argument_id: "",
        //             date: "2020-03-12T21:00:00.000Z",
        //             __v: 0,            
        //             child: [
        //                 {
        //                     _id: "5e6bcda6a62e553ab8d3cccc1",
        //                     author_id: "test",
        //                     comment: "Well, Just experience",
        //                     comment_id: "5e6bcda6a62e553ab83bbbb",
        //                     argument_id: "",
        //                     date: "2020-03-12T21:00:00.000Z",
        //                     __v: 0,
        //                 },
        //                 {
        //                     _id: "5e6bcda6a62e553abd3cccc2",
        //                     author_id: "test",
        //                     comment: "Meat is not high quality",
        //                     comment_id: "5e6bcda6a62e553ab83bbbb",
        //                     argument_id: "",
        //                     date: "2020-03-12T21:00:00.000Z",
        //                     __v: 0,
        //                 }
        //             ]
        //         },
        //         {
        //             _id: "5e6bcda6a62e553ab833bbbb2",
        //             author_id: "test1",
        //             comment: "Meat is high quality",
        //             comment_id: "5e6bcda6a62e553ab833AAAA",
        //             argument_id: "",
        //             date: "2020-03-12T21:00:00.000Z",
        //             __v: 0,
        //         }
        //     ]
        // },
        // {
        //     _id: "5e6bcda6a62e523ves53BBBB",
        //     author_id: "test",
        //     comment: "Really bad smell",
        //     comment_id: "",
        //     argument_id: "5e6ba7921cba1a7324b19f77",
        //     date: "2020-03-12T21:00:00.000Z",
        //     __v: 0,
        //     child: [
        //         {
        //             _id: "5e6bcda6a62e553abeeeaeg9",
        //             author_id: "master",
        //             comment: "How do you know meat is not good?",
        //             comment_id: "5e6bcda6a62e523ves53BBBB",
        //             argument_id: "",
        //             date: "2020-03-12T21:00:00.000Z",
        //             __v: 0,
        //         },
        //         {
        //             _id: "5e6bcda6a62esef553ab8336e3",
        //             author_id: "test1",
        //             comment: "Meat is high quality",
        //             comment_id: "5e6bcda6a62e523ves53BBBB",
        //             argument_id: "",
        //             date: "2020-03-12T21:00:00.000Z",
        //             __v: 0,
        //         }
        //     ]
        // }
    ],
    childCommentList : []
};

export default (state = defaultState, action) => {
    switch(action.type) {
        case COMMENTLIST_LOADED:
            return {
                ...state,
                comments : action.error ? 
                (state.comments || [])
                : state.comments.concat(action.payload)
            };
        case COMMENTCHILDLIST_LOAD:
            let newChilds = state.comments;
            RecursiveAddEngine(newChilds, action.path, 0, action.error ? null : action.payload );
            return {
                comments : action.error ?
                state.comments
                : newChilds,
                childCommentList : action.error ? [] : action.payload 
            }
        case COMMENT_SUBMIT:
            let newComments = state.comments;
            RecursiveAddEngine(newComments, action.path, 0, action.error ? null : action.payload );
            return {
                ...state,
                comments: action.error ? state.comments : newComments
            }
        default: 
            return state;
    }
}

function RecursiveAddEngine (comments = [], path = [], index = 0, payload) {
    if(path.length === 0) {
        Array.isArray(payload) ? comments.push(...payload) : comments.push(payload);
    }
    if(index < path.length) {
        for(let i = 0; i < comments.length; i++) {

            if(comments[i] && (comments[i]._id === path[index])) {
                if(comments[i].child) {
                    if(index === path.length - 1) {
                        comments[i] = {...comments[i], child: (comments[i].child || []).concat(payload)};
                    }
                    else RecursiveAddEngine(comments[i].child, path, ++index, payload);
                } else {
                    comments[i] = {...comments[i], child: [].concat(payload)};
                }
            }
        }
    }
}