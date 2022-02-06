import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import { getAllProducts } from "../api/apiCalls";

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      setProducts(response);
    }
    loadProducts();
  }, []);

  return (
    <div className="products">
      <div className="products_breadcrumbs">
        <p>All Products</p>
      </div>
      <div className="products_main">
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <div className="product_image">
                  <img
                    className="teeImg"
                    src={product.imageURL}
                    alt={product.description}
                  />
                  <div className="product_overlay" />
                </div>
              </Link>
              <Link className="product_link" to={`/products/${product.id}`}>
                <p className="product_name">{product.name}</p>
              </Link>
              <p>{`$${product.price}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
