import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <img className="logo" src="" />
        <h1>I am the header</h1>
      </div>

      <nav>
        <p>Shop</p>

        {/* conditional */}
        <p>Login/Sign-Up</p>
        <p>Log Out</p>

        {/* conditional */}
        <p>Admin ^</p>
        <img className="cartIcon" src="" />
      </nav>
    </div>
  );
};

export default Header;
