import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ api, setLocalStorageUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Log In");

  const navigate = useNavigate();

  const onSubmitLogin = (event) => {
    event.preventDefault();

    setButtonText("Logging in...");

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
        console.log(result);
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
        <div className="login_field">
          <label>email</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="login_field">
          <label>password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button onClick={onSubmitLogin}>{buttonText}</button>
        <Link to="/signup">New here? Sign up here.</Link>
      </form>
    </div>
  );
};

export default Login;
