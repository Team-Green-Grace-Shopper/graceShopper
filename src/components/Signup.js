import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";



const Signup = ({api}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmitSignup = (event) => {
        event.preventDefault();
        async function fetchSignup(){
            const response = await fetch(`${api}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            
            if(response.ok) {
                const result = await response.json();
                return navigate('/login');
              } else {
                alert('Profile not created, plese try again.')
              }
        }
        fetchSignup();
    }
    return(
        <div>
            <h1> Sign-up </h1>
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
                <button onClick={onSubmitSignup}>Sign-up</button>
            </form>
        </div>
    )
}

export default Signup;