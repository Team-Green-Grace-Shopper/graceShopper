import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../api/apiCalls";
import { useNavigate, Link } from "react-router-dom";
import "./AdminProducts.css";


const AdminProducts = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      let response = await getAllProducts();
      console.log(response);
      setProducts(response);
    }
    loadProducts();
  }, []);

 function refreshPage(){
   window.location.reload(false);
 }

  return (
    <div className="products" >
      <h1>All Products</h1>
      {products.map((product) => {

        const onClickDeleteHandler = (event) => {
        const deleteProduct = async () => {
        
          const response = await fetch(`${props.api}/products/${product.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                /* Authorization : `Bearer ${user.token}`, */
            },
            });
        
            if (response.ok) {
              const result = await response.json();
              
              return result;
            } else {
              const error = await response.json();
              throw new Error(error.error);
            }
            
        }   
        deleteProduct();
        refreshPage();
  }
        return (
          <div key={product.id}>
            <i onClick={onClickDeleteHandler} className="fas fa-minus"></i>
            <Link to={`editproduct/${product.id}`}> 
            <i className="far fa-edit"></i>
            </Link>
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
      
//  link "products/:productId"

export default AdminProducts;
