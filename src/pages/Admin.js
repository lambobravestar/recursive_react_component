
import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  return (
    <div>
      <h2 className="text-danger">Admin Page</h2>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;