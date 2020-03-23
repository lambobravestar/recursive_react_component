import React, { useState, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import SquabbleList from './components/SquabbleList';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Admin from "./pages/Admin";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { connect } from 'react-redux';
import { APP_LOADED } from './constants/actionTypes'

const mapDispatchToProps = dispatch => ({
    onLoad: payload => dispatch({ type: APP_LOADED, payload })
})

function App(props) {

    const [authTokens,
        setAuthTokens] = useState();

    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }
    useEffect(() => {
        // const tokens = window.localStorage.getItem("tokens");
        let tokens = null;
        // if (!!(tokens)) tt = JSON.parse(tokens);
        // const tokens = null;
        if (!tokens) {
            tokens = {
                _id: "5e6957d5929bf90584e94369",
                email: "lambodos0228@gmail.com",
                password: "111111",
                username: "testuser",
                __v: 0
            }
            window.localStorage.setItem("tokens", tokens);
        }
        const payload = {
            _id: "5e6957d5929bf90584e94369",
            email: "lambodos0228@gmail.com",
            password: "111111",
            username: "testuser",
            __v: 0
        };
        props.onLoad(payload);
    }, []);
    return (
        <div className="App">
            <AuthContext.Provider
                value={{
                    authTokens,
                    setAuthTokens: setTokens
                }}>
                <Router>
                    <div>
                        <ul>
                            <li>
                                <Link to="/">Home Page</Link>
                            </li>
                            <li>
                                <Link to="/admin">Admin Page</Link>
                            </li>
                        </ul>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <PrivateRoute path="/admin" component={Admin} />
                    </div>
                </Router>
            </AuthContext.Provider>
            <Navbar />

            <SquabbleList />
            {/* <Squabble/> */}
        </div>
    );
}

export default connect(() => ({}), mapDispatchToProps)(App);
