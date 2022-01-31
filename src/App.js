import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Modal from "./components/Modal";
import Header from "./components/Header";
import Products from "./pages/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const api = "http://localhost:4000/api"
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const retrieveUser = localStorage.getItem('user');
    if(retrieveUser){
      const userObject = JSON.parse(retrieveUser);
      setUser(user);
    }
  }, []);

  function setLocalStorageUser(user){
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  function userLogout(){
    console.log('you have logged out');
    setUser(null);
    localStorage.removeItem('user');
    Navigate('/');
  }

  return (
    <div className="App">
      {/* {isModalOpen ? <Modal /> : null} */}
      <Header userLogout={userLogout} user={user}/>
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path='/login' element={<Login api={api} setLocalStorageUser={setLocalStorageUser} />} />
        <Route path='/signup' element={<Signup api={api} />} />
      </Routes>
    </div>
  );
};

export default App;
