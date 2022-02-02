import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../api/apiCalls";
import "./AdminProducts.css";

const AdminProducts = (props) => {
  let user = props.user;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //check if logged in
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  }, []);

  //to protect route on front-end
  // useEffect(() => {
  //   console.log("in useEffect, user: ", user);

  //   //check if admin
  //   if (!(user && user.isAdmin)) {
  //     navigate("/");
  //   }
  // }, []);

  const onClickDeleteHandler = (event) => {
    const deleteRoutine = async (products) => {
      const response = await fetch(`${props.api}/${props.products.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          /* Authorization : `Bearer ${user.token}`, */
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch(console.error);
    };
    deleteRoutine();
  };
  /*  export const deleteCartItem = async (orderItemId) => {
    const response = await fetch(`${APIURL}/orderItems/${orderItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  }; */

  //fix #2 to check isAdmin
  //if not admin, return (plain html)
  //if admin, return below

  return (
    <div className="products">
      <h1>All Products</h1>
      {products.map((product) => {
        return (
          <div>
            <i onClick={onClickDeleteHandler} class="fas fa-minus"></i>
            <i class="far fa-edit"></i>

            <p>Name: {product.name}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <img src={product.imageURL} alt={product.description} />
          </div>
        );
      })}
    </div>
  );
};

export default AdminProducts;
