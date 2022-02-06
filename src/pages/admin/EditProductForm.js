import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditProduct = ({api}) => {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState("");
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const id = useParams()

useEffect(() => {
    const getProductById = async () => {
        const response = await fetch(`${api}/products/${id.userId}`);
    
        if (response.ok) {
        const result = await response.json();
        setProduct(result);
        return result;
        } else {
        const error = await response.json();
        throw new Error(error.error);
        }
    };  
    
    getProductById();
},[]);

  const onClickEditHandler = async (event) => {
      event.preventDefault();

      const response = await fetch(`${api}/products/${id.userId}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
            /* Authorization: `Bearer ${user.token}`, */
          },
        body: JSON.stringify({
            name: nameValue,
            description: descriptionValue,
            price: priceValue,
            imageURL: image
        }) 
    });    
           if (response.ok) {
            const result = await response.json();
            console.log(result);
            navigate("/")
            return result;
            } else {
            const error = await response.json();
            throw new Error(error.error);
            }
      }

      const onNameChangeHandler = async (event) => {
        event.preventDefault();
        
      }
   

  return (
    <form>
      <label >Name:</label>
      <input
        type="text"
        name="name"
        defaultValue={product.name}
        placeholder="name"
        onChange={(event) => {
          setNameValue(event.target.value);
        }}
      />
      <label >Description:</label>
      <input
        type="text"
        name="description"
        defaultValue={product.description}
        placeholder="description"
        onChange={(event) => {
          setDescriptionValue(event.target.value);
        }}
      />
      <label >Price:</label>
      <input
        min="0"
        step="0.01"
        type="number"
        name="price"
        defaultValue={product.price}
        placeholder="price"
        onChange={(event) => {
          setPriceValue(event.target.value);
        }}
      />
      <label >Image URL:</label>
      <input
        type="text"
        name="ImageURL"
        defaultValue={product.imageURL}
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
