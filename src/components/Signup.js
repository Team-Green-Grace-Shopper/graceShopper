import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { createOrder } from "../api/apiCalls";

//   if (response.ok) {
//     const result = await response.json();
//     return navigate("/login");
//   } else {
//     alert("Profile not created, plese try again.");
//   }
const Signup = ({ api }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitSignup = (event) => {
    event.preventDefault();

    async function fetchSignup() {
      //1. register user
      const response = await fetch(`${api}/users/register`, {
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
        const userId = result.user.id;
        const cartObj = {
          userId: userId,
          orderType: "cart",
        };

        //2. create empty cart
        async function makeCart() {
          await createOrder(cartObj);
        }
        makeCart();

        //3. redirect to login
        navigate("/login");
      } else {
        alert(result.error);
      }
    }
    fetchSignup();
  };

  return (
    <div className="signup">
      <h1> Sign-up </h1>
      <form className="signup_form">
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
        <button onClick={onSubmitSignup}>Sign-up</button>
        <Link to="/login"> Have an account? Log in</Link>
      </form>
    </div>
  );
};

export default Signup;
