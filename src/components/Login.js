import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ api, setLocalStorageUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitLogin = (event) => {
    event.preventDefault();
    async function fetchLogin() {
      const response = await fetch(`${api}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }),
        result = await response.json();

      if (response.ok) {
        setLocalStorageUser(result);
        navigate("/");
      } else {
        alert(result.error);
      }
    }
    fetchLogin();
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login_form">
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button onClick={onSubmitLogin}>Login</button>
        <Link to="/signup"> Need to Sign-up?</Link>
      </form>
    </div>
  );
};

export default Login;
