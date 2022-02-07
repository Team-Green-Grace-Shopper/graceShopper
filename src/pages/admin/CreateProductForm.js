import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminForm.css";

const CreateProduct = ({ api }) => {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const onClickPostHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`${api}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        /* Authorization: `Bearer ${user.token}`, */
      },
      body: JSON.stringify({
        name: nameValue,
        description: descriptionValue,
        price: priceValue,
        imageURL: image,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (result.id) {
      navigate("/adminproducts");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="adminForm">
      <h1>Create A Product</h1>
      <form className="adminFormMain">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={nameValue}
          onChange={(event) => {
            setNameValue(event.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={descriptionValue}
          onChange={(event) => {
            setDescriptionValue(event.target.value);
          }}
        />
        <label>Price</label>
        <input
          min="0"
          step="0.01"
          type="number"
          name="price"
          value={priceValue}
          onChange={(event) => {
            setPriceValue(event.target.value);
          }}
        />
        <label>Image URL</label>
        <input
          type="text"
          name="ImageURL"
          value={image}
          onChange={(event) => {
            setImage(event.target.value);
          }}
        />
        <button
          className="adminFormButton"
          onClick={onClickPostHandler}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreateProduct;
