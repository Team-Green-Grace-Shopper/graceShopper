import React, { useEffect } from "react";
import "./Products.css";
import { getAllProducts } from "../api/apiCalls";

const Products = ({ products, setProducts }) => {
  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  }, [setProducts]);

  return (
    <div className="products">
      <h1>All Products</h1>
      {products.map((product) => {
        return (
          <div>
            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.imageURL} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
