import React from 'react';
import { connect } from 'react-redux';
import Squabble from './Squabble';
import SquabbleCreator from "./SquabbleCreator";
import {
    SQUABBLELIST_LOADED
} from "../constants/actionTypes";
import axios from 'axios';

const mapStateToProps = state => ({
    squabbleList: state.squabble.squabbleList
});

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({type: SQUABBLELIST_LOADED, payload})
})


class SquabbleList extends React.Component {

    componentDidMount() {
        const payload = axios.get("http://localhost:3000/squabbles");
        this.props.onLoad(payload);
    }
    render() {
        return (
            <div className="container">
                <SquabbleCreator />
                    {
                        this.props.squabbleList.map(squabble => (
                                <Squabble squabble={squabble} key={squabble._id}/>
                        ))
                    }
            </div>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SquabbleList);
