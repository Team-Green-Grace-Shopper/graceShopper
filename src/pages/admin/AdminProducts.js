import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/apiCalls";
import { Link } from "react-router-dom";
import "./AdminProducts.css";

const AdminProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();

    setIsDeleted(false);
  }, [isDeleted]);

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  return (
    <div className="products">
      <div className="products_title">
        <h1>(Admin-view) All Products</h1>
      </div>

      <Link className="admin_link" to="/createproduct">
        <button className="admin_create_button">Create Product</button>
      </Link>

      <div className="admin_products_main">
        {products.map((product) => {
          const onClickDeleteHandler = (event) => {
            const deleteProduct = async () => {
              const response = await fetch(
                `${props.api}/products/${product.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    /* Authorization : `Bearer ${user.token}`, */
                  },
                }
              );

              if (response.ok) {
                const result = await response.json();

                return result;
              } else {
                const error = await response.json();
                throw new Error(error.error);
              }
            };
            deleteProduct();

            setIsDeleted(true);
            // refreshPage();
          };
          return (
            <div className="product" key={product.id}>
              <div className="admin_buttons_box">
                <i
                  onClick={onClickDeleteHandler}
                  className="fas fa-trash-alt"
                ></i>
                <Link to={`editproduct/${product.id}`}>
                  <i className="far fa-edit"></i>
                </Link>
              </div>

              <div className="product_image">
                <img
                  className="teeImg"
                  src={product.imageURL}
                  alt={product.description}
                />
                <div className="product_overlay" />
              </div>

              <p className="product_name">{product.name}</p>
              <p>{`$${product.price}.00`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

//  link "products/:productId"

export default AdminProducts;
