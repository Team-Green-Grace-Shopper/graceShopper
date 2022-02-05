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
      <div className="thankYou">
        <h1>Thanks for your order, {firstName}!</h1>
      </div>

      <div className="orderConfirmation">
        <p className="image">[cute pic here]</p>
        <div className="message">
          <p>We've sent a receipt with order details to {email}</p>
          <p>Your order #{orderNum} is confirmed</p>
        </div>
      </div>

      <div className="products">
        <h1>Keep shopping</h1>
        <div className="main">
          {products.map((product) => {
            return (
              <div className="product" key={product.id}>
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <img
                  className="teeImg"
                  src={product.imageURL}
                  alt={product.description}
                />

                <Link to={`/products/${product.id}`}>
                  <button>View</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostCheckout;
