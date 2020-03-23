import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    COMMENT_SUBMIT
} from '../constants/actionTypes'
const mapStateToProps = state => ({
    common: state.common
});
const mapDispatchToProps = dispatch => ({
    onSubmit: (payload, path) => dispatch({type: COMMENT_SUBMIT, payload, path})
})

class CommentInput extends React.Component{
    constructor() {
        super();
        this.state ={
            value: ""
        }
    }
    onChangeHandle = (ev) => {
        this.setState({value : ev.target.value})
    }
    onClickHandle = () => {
        const url = "http://localhost:3000/comments";
        const data = {
            author_id: this.props.common.currentUser,
            comment: this.state.value,
            comment_id: this.props.parentComment ? this.props.parentComment._id : null,
            argument_id: this.props.parentArgument ? this.props.parentArgument._id : null
        };
        const payload = Axios.post(url, data);
        this.props.onSubmit(payload, this.props.path);
        this.setState({value:""});
    }
    render() {
        let level = this.props.level;
        let path = this.props.path;
        return (
            <div className="row">
                { level%2 === 0 ? <div className="col-6"></div> : null }
                <div className="col-6">
                    <div className="input-group m-2">
                        <input 
                            type="text" 
                            className="form-control form-control-alt" 
                            placeholder="Have a say"
                            value={this.state.value}
                            onChange={this.onChangeHandle}
                        />
                        <div className="input-group-append mr-3">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={this.onClickHandle}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                { level%2 !== 0 ? <div className="col-6"></div> : null }
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentInput);