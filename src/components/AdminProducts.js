import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/apiCalls";
import "./AdminProducts.css";

const AdminProducts = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  }, []);

  const onClickDeleteHandler = (event) => {
      const deleteRoutine = async () => {
        const response = await fetch (`${props.api}/${products.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                /* Authorization : `Bearer ${user.token}`, */
            }
            }).then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(console.error);
      }
      deleteRoutine();
  }

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
            <img src={product.imageURL} alt = {product.description} />

          </div>
        );
      })}
    </div>
  );
};
      


export default AdminProducts;
