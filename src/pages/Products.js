import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { getAllProducts } from "../api/apiCalls";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  }, []);

  return (
    <div className="products">
      <h1>All Products</h1>
      {products.map((product) => {
        return (
          <div>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.imageURL} alt = {product.description} />

            <Link to = {`/products/${product.id}`}>
              <button>View</button>
            </Link>
            
          </div>
        );
      })}
    </div>
  );
};
      


export default Products;
