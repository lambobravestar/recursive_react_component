import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
//import logoImg from "../img/logo.jpg";
import { Card, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import {connect} from "react-redux";
import {
    LOGIN
} from "../constants/actionTypes"
const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({type: LOGIN, payload})
})
function Login(props) {
    // const referer = props.location.state.referer || '/';

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens, authTokens } = useAuth();

    function postLogin() {
        // axios.post("http://localhost:3000/users/login", {
        //     username,
        //     password
        // }).then(result => {
        //     console.log(result);
        //     if (result.status === 201) {
        //         setAuthTokens(result.data);
        //         console.log(authTokens);
        //         setLoggedIn(true);
        //     } else {
        //         setIsError(true);
        //     }
        // }).catch(e => {
        //     setIsError(true);
        // });
        const payload = axios.post("http://localhost:3000/users/login", { username, password });
        props.onSubmit(payload);
        // if (result.status === 201) {
        //         setAuthTokens(result.data);
        //         console.log(authTokens);
        //         setLoggedIn(true);
        //     } else {
        //         setIsError(true);
        //     }
    }

    if (isLoggedIn) {
        // return <Redirect to={referer} />;
    }

    return (
        <Card>

            <Form>
                <Input
                    type="username"
                    value={username}
                    onChange={e => { setUserName(e.target.value); }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            {isError && <Error>The username or password provided were incorrect!</Error>}
        </Card>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);