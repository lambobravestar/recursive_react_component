import React from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from 'axios';
import { connect } from 'react-redux';
import Argument from './Argument';
import {
    ARGUMENTLIST_LOADED,
    ANTI_ARGUMENTLIST_LOADED,
    SQUABBLE_CHALLENGE,
    SQUABBLE_SELECT
} from "../constants/actionTypes";

const mapStateToProps = state => ({
        common: state.common,
        argumentList: state.argument.argumentList,
        anti_argumentList: state.argument.anti_argumentList
});

const mapDispatchToProps = dispatch => ({
    onChallenge: payload => dispatch({type: SQUABBLE_CHALLENGE, payload}),
    onArgListLoad : payload => dispatch({type: ARGUMENTLIST_LOADED, payload}),
    onAntiArgListLoad : payload => dispatch({type: ANTI_ARGUMENTLIST_LOADED, payload}),
    onSelect: payload => dispatch({type: SQUABBLE_SELECT, payload})
});

const manipulateArray = arr => {
    const len = arr.length;
    if (len < 5) {
        for (let i= 0; i< 5-len; i++) arr.push(null);
    }
    return arr;
}

class Squabble extends React.Component {
    constructor() {
        super();
        this.state = {
            isArgumentListShow: false,
            targetSqquableId : "",
            targetSqquableAuthor : "",
            antiThesis: "",
            antiThesisImg: "",
            show: false
        };
    }
    onModalHandleShow = (squabble) => {
        this.setState({ 
            show: true,
            targetSqquableId: squabble._id,
            targetSqquableAuthor: squabble.author_id
         });
    }
    handleClose = () => {
        this.setState({show: false})
    }
    handleTextChange = (ev, tag) => {
        if (tag === "anti_Thesis") {
            this.setState({antiThesis: ev.target.value});
        }
        if (tag === "anti_Thesis_Img") {
            this.setState({antiThesisImg: ev.target.value});
        }
    }
    onSubmitHandle = () => {
        // if(this.props.common.currentUser === this.state.targetSqquableAuthor) {
        //     alert("You cannot challenge yourself");
        // } else {
            this.handleClose();
            let url = "http://localhost:3000/squabbles/challenge";
            const data = {
                squabble_id: this.state.targetSqquableId,
                anti_thesis: this.state.antiThesis, 
                challenger_id: this.props.common.currentUser, 
                anti_thesis_img: this.state.antiThesisImg
            };
            const payload = axios.put(url, data);
            this.props.onChallenge(payload);
        // }
    }
    onShowHandle = () => {
        if(this.props.squabble.status === "In-Progress") {
            const payload = {
                selectedSquabbleId: this.props.squabble._id,
                squabbleAuthor: this.props.squabble.author_id,
                challanger: this.props.squabble.challenger_id
            };
            this.props.onSelect(payload);
            this.setState({ isArgumentListShow : !this.state.isArgumentListShow});
        };
    }
    componentDidMount() {
        let url = `http://localhost:3000/arguments/squabble/${this.props.squabble._id}/${this.props.squabble.author_id}`;
        let payload = axios.get(url);
        this.props.onArgListLoad(payload);
        if(this.props.squabble.status !== "Open") 
        {   
            let url = `http://localhost:3000/arguments/squabble/${this.props.squabble._id}/${this.props.squabble.challenger_id}`;
            const payload = axios.get(url);
            this.props.onAntiArgListLoad(payload);
        }
    }
    render() {
        const argumentList = this.props.argumentList.filter(arg => {
            if(arg && arg.squabble_id) return arg.squabble_id === this.props.squabble._id;
            else return false;
        });
        const anti_argumentList = this.props.anti_argumentList.filter(arg => {
            if(arg && arg.squabble_id) return arg.squabble_id === this.props.squabble._id;
            else return false;
        });
        manipulateArray(argumentList);
        manipulateArray(anti_argumentList);
        return (
            <div className="row">
                <div className="col-12 border border-primary border-1 m-1">
                    <div className="row border-bottom border-primary" onClick={this.onShowHandle}>
                        <div className="col-6">
                            <h2>{this.props.squabble.author_id} : {this.props.squabble.thesis}</h2>
                        </div>
                        {
                            this.props.squabble.status === "In-Progress" ? 
                            <div className="col-6">
                                <h2>{this.props.squabble.challenger_id} : {this.props.squabble.anti_thesis}</h2>
                            </div>
                            : 
                            <Button variant="btn btn-success ml-auto m-2" onClick={() => this.onModalHandleShow(this.props.squabble)}>
                                challenge
                            </Button>
                        }
                    </div>
                    {
                        this.state.isArgumentListShow ?
                        argumentList.map((argument, index) => <Argument key={index} parentSquabble={this.props.squabble} argument={argument} anti_argument={anti_argumentList[index]}/>)
                        : null
                    }
                </div>
                <Modal show={this.state.show} onHide={this.handleClose} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Challenge Content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label htmlFor="thesis">Anti Thesis</label>
                        <input
                            value={this.state.antiThesis}
                            onChange={(ev) => this.handleTextChange(ev, 'anti_Thesis')} />
                        <label htmlFor="anti_thesis_img">Anti Thesis Image</label>
                        <input
                            value={this.state.antiThesisImg}
                            onChange={(ev) => this.handleTextChange(ev, "anti_Thesis_Img")} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.onSubmitHandle}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Squabble);
