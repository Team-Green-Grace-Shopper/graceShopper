import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Login.css";

const Login = ({api, setLocalStorageUser}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitLogin = (event) => {
        event.preventDefault();
        async function fetchLogin() {
            const response = await fetch(`${api}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            }),

            result = await response.json();

            if(response.ok) {
                setLocalStorageUser(result);
                navigate('/');
              } else {
                alert('Incorrect Username/Password')
              }
        }
        fetchLogin();
    }

    return(
        <div>
        <h1> Login </h1>
        <form>
            <input
                type='text'
                placeholder='enter email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <input
                type='password'
                placeholder='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={onSubmitLogin}>Login</button>
            <NavLink to='/signup'> Need to Sign-up?</NavLink>
        </form>
    </div>
    )
}

export default Login;