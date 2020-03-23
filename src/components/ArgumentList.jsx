import React from 'react';
import {connect} from 'react-redux';
import {
    ARGUMENTLIST_LOADED
} from "../constants/actionTypes";
import axios from 'axios';

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({type: ARGUMENTLIST_LOADED, payload})
})
const InputArgument = (props) => {
    return (
        <div className="row my-1 mb-1">
            <div className="col-md-6">         
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Have a say" />
                        <div className="input-group-append">
                            <button 
                            type="button" 
                            className="btn btn-primary"
                            // onClick={props.origin.}
                            >Submit</button>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    );
}
class ArgumentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        let url = "http://localhost:3000/arguments/squabble/" + this.props.targetSqquable._id;
        const payload = axios.get(url);
        this.props.onLoad(payload);
    }

    render() {
        const argumentList = this.props.argument.argumentList ? this.props.argument.argumentList : [];
        if(argumentList.length < 5) {
            for (let i = 0; i < (5 - argumentList.length); i++) {
                argumentList.push("");
            }
        }
        return (
            <div>
                {
                    argumentList.map((argument, index) => {
                        if(argument !== "") return (<div key={index}>Here</div>);
                        // return <Comment key={index}/>;
                        else return (<InputArgument origin={this} target={this.props.targetSqquable}/>);
                    })
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentList);