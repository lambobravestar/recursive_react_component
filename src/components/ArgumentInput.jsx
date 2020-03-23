import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
    ARGUMENT_SUBMIT,
    ANTI_ARGUMENT_SUBMIT
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    common: state.common
});

const mapDispatchToProps = dispatch => ({
    onArgSubmit : (payload) => dispatch({type: ARGUMENT_SUBMIT, payload}),
    onAntiArgSubmit : (payload) => dispatch({type: ANTI_ARGUMENT_SUBMIT, payload}),
});

class ArgumentInput extends React.Component {
    constructor () {
        super();
        this.state = {
            argument:""
        }
    }
    onSubmitHandle = () => {
        const url = "http://localhost:3000/arguments";
        let data = {
            author_id: this.props.common.currentUser,
            squabble_id: this.props.parentSquabble._id,
            argument: this.state.argument
        };

        const payload = Axios.post(url, data);
        this.props.isAnti ? 
        this.props.onAntiArgSubmit(payload)
        : this.props.onArgSubmit(payload);
        this.setState({argument:""});
    }
    onChangeHandle = (ev) => {
        this.setState({ argument: ev.target.value })
    }
    render() {
        return (
            <div className="col-6">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control form-control-alt" 
                        placeholder="Have a say"
                        value={this.state.argument}
                        onChange={this.onChangeHandle}
                    />
                    <div className="input-group-append mr-3">
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onSubmitHandle}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentInput);