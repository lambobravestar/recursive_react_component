import React from 'react';
import {connect} from 'react-redux';
import {
    ADD_SQUABBLE
} from "../constants/actionTypes";
import {Button} from "react-bootstrap";
import axios from "axios";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onAddSquabble: payload => dispatch({type: ADD_SQUABBLE, payload})
})

class SquabbleCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thesis : "",
            expiration_date : ""
        };
    }
    onSubmit = () => {

        const payload = axios.post("http://localhost:3000/squabbles", {
            thesis: this.state.thesis, 
            author_id: this.props.common.currentUser, 
            expiration_date: this.state.expiration_date
        });
        this.props.onAddSquabble(payload);

        const votes = {
            votes: 0
        };
    }
    handleTextChange = (ev) => {
        this.setState({ thesis : ev.target.value});
    }
    handleDateChange = (ev) => {
        this.setState({ expiration_date : ev.target.value});
    }
    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-primary my-2"
                    data-toggle="modal"
                    data-target="#exampleModal">
                    Create Squabble
                </button>

                {/* --- Create Squabble Modal --- */}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Modal title
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-body">
                                <fieldset>
                                    <label htmlFor="thesis">Thesis:</label>
                                    <input
                                        type="text"
                                        id="thesis"
                                        name="thesis"
                                        value={this.state.thesis}
                                        onChange={this.handleTextChange}/>

                                    <label htmlFor="expiration">Expiration Date:</label>
                                    <input
                                        type="date"
                                        id="expdate"
                                        name="expdate"
                                        value={this.state.expiration_date}
                                        onChange={this.handleDateChange}/>
                                </fieldset>
                            </div>
                            <div className="modal-footer">
                                <Button
                                    data-dismiss="modal"
                                    bsstyle="success"
                                    bssize="small"
                                    onClick={this.onSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --- End Squabvle Modal --- */}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SquabbleCreator);