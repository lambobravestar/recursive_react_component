import React from 'react';
import CommentTree from './CommentTree';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
    COMMENTLIST_LOADED,
    ARGUMENT_SELECT
} from '../constants/actionTypes';
import ArgumentInput from './ArgumentInput';

const mapStateToProps = state => ({
    common: state.common,
    squabble: state.squabble,
    commentList: state.comment.comments,
    // selectedArgumentId: state.argument.selectedArgumentId
});

const mapDispatchToProps = dispatch => ({
    onLoad : payload => dispatch({type: COMMENTLIST_LOADED, payload}),
    // onArgumentSelect : payload => dispatch({type: ARGUMENT_SELECT, payload})
});

class Argument extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            isAnti: false
        };
    }
    handleTrigger = (tag , arg_id) => {
        // const payload = {
        //     selectedArgumentId : arg_id
        // };
        // if(!this.state.isOpen) this.props.onArgumentSelect(payload);
        this.setState({isOpen: !this.state.isOpen})
        if(tag === "Arg") this.setState({isAnti : false});
        if(tag === "Anti_Arg") this.setState({isAnti : true});
    }
    componentDidMount() {
        if(this.props.argument && this.props.argument._id) {
            let url = `http://localhost:3000/comments/argument/${this.props.argument._id}`;
            const payload = Axios.get(url);
            this.props.onLoad(payload);
        }
    }
    render() {
        const commentList = this.props.commentList.filter(comment => {
            if(comment) return comment.argument_id === (this.props.argument && this.props.argument._id);
            else return false;
        });
        const argument = this.props.argument || null;
        const anti_argument = this.props.anti_argument || null;
        if(argument !== null)  return (
            <React.Fragment>
                <div className="row mb-3">
                    <div className="col-6">
                        <h3 onClick={() => this.handleTrigger("Arg", argument._id)}>{argument.author_id} : {argument.argument}</h3>
                    </div>
                    { 
                        anti_argument ? 
                        (
                            <div className="col-6">
                                <h3 onClick={() => this.handleTrigger("Anti_Arg", anti_argument._id)}>{anti_argument.author_id} : {anti_argument.argument}</h3>
                            </div>
                        ) 
                        : 
                        (
                            // this.props.squabble.challanger === this.props.common.currentUser?
                            <ArgumentInput parentSquabble={this.props.parentSquabble} isAnti={true}/>
                            // : null
                        )
                    }
                </div>
                {
                    this.state.isOpen && <CommentTree comments={commentList} parentArgument={this.props.argument} isAnti={this.state.isAnti}/>
                }
            </React.Fragment>
        );

        else return (
            <div className="row mb-3">
                {
                    // this.props.squabble.squabbleAuthor === this.props.common.currentUser ?
                    <ArgumentInput parentSquabble={this.props.parentSquabble} isAnti={false}/>
                    // : <div  className="col-6"></div>
                }
                { 
                    anti_argument ? 
                    <div className="col-6">
                        <h3 onClick={() => this.handleTrigger("Anti_Arg", anti_argument._id)}>{anti_argument.author_id} : {anti_argument.argument}</h3> 
                    </div>
                    :
                    (
                        // this.props.squabble.challanger === this.props.common.currentUser?
                        <ArgumentInput parentSquabble={this.props.parentSquabble} isAnti={true}/>
                        // : null
                    )
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Argument);