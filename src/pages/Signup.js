import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
//import logoImg from "../img/logo.jpg";
import { Card, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import {connect} from "react-redux";
import {
    REGISTER
} from "../constants/actionTypes"
const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    onSubmit: payload => dispatch({type: REGISTER, payload})
})

function Signup(props) {
  // const referer = props.location.state.referer || '/';

  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ username, setUserName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [ email, setEmail ] = useState("");
  const { setAuthTokens } = useAuth();

  function postSignup() {
    // axios.post("http://localhost:3000/users/signup", {
    //   username,
    //   password,
    //   email
    // }).then(result => {
    //   console.log(result);
    //   if (result.status === 201) {
    //     setAuthTokens(result.data);
    //     setLoggedIn(true);
    //   } else {
    //     setIsError(true);
    //   }
    // }).catch(e => {
    //   setIsError(true);
    // });
    const payload = axios.post("http://localhost:3000/users/signup", { username, password,  email });
    props.onSubmit(payload);
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
          onChange={e => {
            setUserName(e.target.value);
          }}
          placeholder="Username"
        />
        <Input
          type="email" value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="email" />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password!" />
        <Input
          type="passwordConfirm"
          value={passwordConfirm}
          onChange={e => {
            setPasswordConfirm(e.target.value);
          }}
          placeholder="password again!" />
        <Button onClick={postSignup}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);