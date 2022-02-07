import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ userLogout, user, totalItemNumber }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {}, [totalItemNumber]);

  return (
    <div className="header">
      <nav className="header_nav">
        {/* GUEST */}
        {!user && (
          <Link className="nav_login" to="/login">
            Login/Register
          </Link>
        )}

        {/* USER */}
        {user && (
          <div className="nav_user">
            <div
              className="nav_user_dropdown"
              onClick={(event) => {
                event.preventDefault();
                setMenuIsOpen(!menuIsOpen);
              }}
            >
              {user.isAdmin ? (
                <div className="user_box">
                  <i className="user_icon fas fa-crown"></i>
                  <p className="user_email">{user.email}</p>
                </div>
              ) : (
                <div className="user_box">
                  <i className="user_icon fas fa-user" />
                  <p className="user_email">{user.email}</p>
                </div>
              )}

              {menuIsOpen ? (
                <i className="menu_icon fas fa-caret-up down"></i>
              ) : (
                <i className="menu_icon fas fa-caret-up up"></i>
              )}
            </div>

            {/* ADMIN */}
            {menuIsOpen && user.isAdmin ? (
              <div className="menu_box">
                <Link className="menu_link" to="/adminproducts">
                  <div className="menu_line">
                    <i className="menu_icon fas fa-tshirt"></i>All Products
                  </div>
                </Link>

                <Link className="menu_link" to="/users/all">
                  <div className="menu_line">
                    <i class="menu_icon fas fa-users"></i>All Users
                  </div>
                </Link>
              </div>
            ) : null}

            {/* LOGOUT */}
            {menuIsOpen ? (
              <div className="logout_box">
                {/* <div className="menuTriangle"></div> */}
                <Link className="menu_link" onClick={userLogout} to="/">
                  <div className="menu_line">
                    <i className="menu_icon fas fa-sign-out-alt"></i>Logout
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        )}

        {/* CART */}
        {user && (
          <div className="nav_cart_box">
            <Link className="nav_cart" to="/cart/user">
              <i className="fas fa-shopping-cart"></i>
              {`Cart (${totalItemNumber})`}
            </Link>
          </div>
        )}

        {!user && (
          <div className="nav_cart_box">
            <Link className="nav_cart" to="cart/guest">
              <i className="fas fa-shopping-cart"></i>
              {`Cart (${totalItemNumber})`}
            </Link>
          </div>
        )}
      </nav>

      <Link className="audacitee_link" to="/products">
        <div className="header_audacitee">
          <h1 className="header_title">AUDACITEE</h1>
          <img
            className="header_logo"
            // src="https://i.postimg.cc/0Nmgn3JN/image-copy.png"
            src="https://i.postimg.cc/tTDgzYYd/audacitee-logo.png"
            alt="Audacitee logo"
          />
        </div>
      </Link>
    </div>
  );
};

export default Header;
