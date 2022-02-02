import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

const Header = ({userLogout, user}) => {
  //CONDITIONAL RENDERING FOR ADMIN VS USER ON SHOP VS CUSTOMER VIEW
  return (
    <div className="header">
      <div className="title">
        <img className="logo" src="https://i.postimg.cc/VN45j9x7/Audacitee.png" alt="Audacitee logo" />
      </div>

      <nav>
        <NavLink className="link" to="products">Shop</NavLink>
        {!user && <NavLink className="link" to="/login">Login</NavLink>}
        {user && <NavLink className="link" to="/adminproducts">View Products</NavLink>}
        {user && <NavLink className="link" to="/createproduct">Create Product</NavLink>}
        <NavLink className="link" to="/">View Users</NavLink>
        {user && <NavLink className="link" onClick={userLogout} to="/">Logout</NavLink>}
        <i className="fas fa-shopping-cart"></i>
      </nav>
    </div>
  );
};

export default Header;
