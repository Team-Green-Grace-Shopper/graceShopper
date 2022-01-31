import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({logUserOut, user}) => {
  
  return (
    <div className="header">
      <div className="title">
        <img className="logo" src="" />
        <h1>I am the header</h1>
      </div>

      <nav>
        <NavLink to="products">Shop</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink onClick={logUserOut} to="/">Logout</NavLink>
        <select className="adminDropdown">
          <option value="viewProducts">View Products</option>
          <option value="createProducts">Create Product</option>
          <option value="viewUsers">View Users</option>
        

        </select>

        <img className="cartIcon" src="" />
      </nav>
    </div>
  );
};

export default Header;
