import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/apiCalls";


const EditProduct = ({api}) => {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const id = useParams()


// you would need useParams pull productId out of the the route to use in 

  const getProductById = async () => {
    const response = await fetch(`${api}/products/${id}`);

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  };

  getProductById();  

  const product = {
      name: nameValue,
      description: descriptionValue,
      price: priceValue,
      image: image,
  }

  const onClickEditHandler = async (event) => {
      event.preventDefault();
      const response = await fetch(`${api}/products`,{
        method: 'PATCH',
        body: JSON.stringify({
            name: nameValue,
            description: descriptionValue,
            price: priceValue,
            imageURL: image

        }) .then(response => response.json())
           .then(result => {
               console.log(result);
           })
           .catch(console.error)
      }
      )}
    
  return (
    <form>
      <label >Name:</label>
      <input
        type="text"
        name="name"
        defaultValue={products.name}
        placeholder="name"
        onChange={(event) => {
          setNameValue(event.target.value);
        }}
      />
      <label >Description:</label>
      <input
        type="text"
        name="description"
        defaultValue={products.description}
        placeholder="description"
        onChange={(event) => {
          setDescriptionValue(event.target.value);
        }}
      />
      <label >Price:</label>
      <input
        min="0"
        step="1.00"
        type="number"
        name="price"
        defaultValue={products.price}
        placeholder="price"
        onChange={(event) => {
          setPriceValue(event.target.value);
        }}
      />
      <label >Image URL:</label>
      <input
        type="text"
        name="ImageURL"
        defaultValue={products.imageURL}
        placeholder="image URL"
        onChange={(event) => {
          setImage(event.target.value);
        }}
      />
      <button onClick={onClickEditHandler} type="submit">
        Submit
      </button>
    </form>
  );
};
export default EditProduct;
