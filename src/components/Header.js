import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ userLogout, user }) => {
  //CONDITIONAL RENDERING FOR ADMIN VS USER ON SHOP VS CUSTOMER VIEW
  return (
    <div className="header">
      <div className="title">
        <img
          className="logo"
          src="https://i.postimg.cc/0Nmgn3JN/image-copy.png"
          alt="Audacitee logo"
        />
      </div>

      <nav>
        <NavLink className="link" to="products">
          Shop
        </NavLink>
        {!user && (
          <NavLink className="link" to="/login">
            Login
          </NavLink>
        )}
        {user && (
          <NavLink className="link" to="/adminproducts">
            View Products
          </NavLink>
        )}
        {user && (
          <NavLink className="link" to="/createproduct">
            Create Product
          </NavLink>
        )}

        <NavLink className="link" to="/users/all">
          View Users
        </NavLink>

        {user && (
          <NavLink className="link" onClick={userLogout} to="/">
            Logout
          </NavLink>
        )}

        {user && (
          <NavLink to="/cart/user">
            <i className="fas fa-shopping-cart"></i>
            Cart (u)
          </NavLink>
        )}

        {!user && (
          <NavLink to="cart/guest">
            <i className="fas fa-shopping-cart"></i>
            Cart (g)
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Header;
