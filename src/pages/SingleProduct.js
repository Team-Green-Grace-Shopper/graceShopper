import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import { getProductById } from "../api/apiCalls";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const {id} = useParams()
  const[product, setProduct] = useState([])
  
  useEffect(() => {
    async function loadProduct () {
      let response = await getProductById(id)
      setProduct(response)
    }
    loadProduct();
  },[])

  return(
    <div>
      <h2>Single Product Page</h2>
      <p>id:{product.id}</p>
      <p>name:{product.name}</p>
      <p>description:{product.description}</p>
      <p>price:{product.price}</p>
      <img src={product.imageURL} alt = {product.description}  />
      <Link to = {`/products`}>
      <button>All Products</button>
      </Link>
    </div> 
    
  )

}

export default SingleProduct;

