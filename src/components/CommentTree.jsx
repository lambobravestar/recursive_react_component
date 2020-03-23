import React from 'react';
import CommentInput from './CommentInput';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    COMMENTCHILDLIST_LOAD,
    COMMENTCHILDLIST_UNLOAD
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    childCommentList : state.comment.childCommentList
});

const mapDispatchToProps = dispatch => ({
    onCommentChildLoad : (payload, path) => dispatch({type: COMMENTCHILDLIST_LOAD, payload , path})
});

const manipulateArray = array => {
    let arr = array.filter(item => !!(item));
    const len = arr.length;
    if (len < 5) {
        for (let i= 0; i< 5 - len; i++) arr.push(null);
    }
    return arr;
}

class _CommentTree extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            comment_id: ""
        };
    }
    hasChild = (comment) => {
        return comment.child && comment.child.length;
    }
    handleTrigger = (comment_id) => {
        this.setState({isOpen: true, comment_id: comment_id});
    }

    componentDidMount() {
        let path = this.props.path || [];
        let parentComment = this.props.parentComment || null;

        if(path.length) {
            let url = `http://localhost:3000/comments/comment/${parentComment._id}`;
            const payload = Axios.get(url);
            this.props.onCommentChildLoad(payload, path.concat(parentComment._id));
        }
    }
    componentWillUnmount() {

    }
    render() {
        let level = this.props.level || 0;
        let path = this.props.path || [];
        if(this.props.isAnti) level = this.props.level || 1;
        const pos = level % 2 === 0 ? "text-right" : "text-left";

        let commentList = manipulateArray(this.props.comments);
        return (
            <div className="row m-3">
                <div className="border border-danger">
                    <div className="row">
                        {commentList.map((comment, index) => 
                            comment ?
                            (
                                <React.Fragment key={comment._id}>
                                    <div className="col-12">
                                        <h3 className={`${pos}`} onClick={() => this.handleTrigger(comment._id)}>{comment.author_id} : {comment.comment} - {level}</h3>
                                        {
                                            this.state.isOpen && (comment._id === this.state.comment_id)?
                                            ( 
                                                this.hasChild(comment) ? 
                                                <CommentTree comments={comment.child} level={level + 1} parentComment = {comment} path={path ? path.concat([comment._id]) : [comment._id] }/>
                                                : <CommentTree comments={this.props.childCommentList || []} level={level + 1} parentComment = {comment} path={path ? path.concat([comment._id]) : [comment._id] }/>
                                            )
                                            : null
                                        }       
                                    </div>               
                                </React.Fragment>
                            )
                            :   <React.Fragment key={index}>
                                    <div className="col-12">
                                        <CommentInput level={level} parentArgument={this.props.parentArgument} parentComment={this.props.parentComment} path={path} />
                                    </div>
                                </React.Fragment>
                            )}
                    </div>
                </div>
            </div>
        );

    }
}

// This is because of Store connection in Recursive component
const CommentTree = connect(mapStateToProps, mapDispatchToProps)(_CommentTree);

export default CommentTree;