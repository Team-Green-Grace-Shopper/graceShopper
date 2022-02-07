import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PostCheckout.css";
import { getAllProducts } from "../api/apiCalls";

const PostCheckout = ({ email, firstName, orderNum }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      setProducts(response);
    }
    loadProducts();
  }, []);

  return (
    <div className="postCheckout">
      <div className="top">
        <div className="thankYou">
          <h1>Thanks for your order, {firstName}!</h1>
        </div>

        <div className="orderConfirmation">
          <p>We've sent a receipt with order details to {email}.</p>
          <p>Your order #{orderNum} is confirmed.</p>
        </div>
      </div>
    </div>
  );
};

export default PostCheckout;
