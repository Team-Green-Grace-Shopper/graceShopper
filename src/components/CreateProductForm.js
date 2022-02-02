import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//name, description, price, imageURL

const CreateProduct = ({ api, user }) => {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const onClickPostHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${api}/routines`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name: nameValue,
            description: descriptionValue,
            price: priceValue,
            imageURL: image,
          }),
        }),
        result = await response.json();
      console.log(result);

      if (result.ok) {
        navigate("/");
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  //name, description, price, imageURL

  return (
    <form>
      <label for="name">Name:</label>
      <input
        type="text"
        name="name"
        value={nameValue}
        placeholder="name"
        onChange={(event) => {
          setNameValue(event.target.value);
        }}
      />
      <label for="description">Description:</label>
      <input
        type="text"
        name="description"
        value={descriptionValue}
        placeholder="description"
        onChange={(event) => {
          setDescriptionValue(event.target.value);
        }}
      />
      <label for="price">Price:</label>
      <input
        min="0"
        step="0.01"
        type="number"
        name="price"
        value={priceValue}
        placeholder="price"
        onChange={(event) => {
          setPriceValue(event.target.value);
        }}
      />
      <lable for="file">Upload File:</lable>
      <input type="file" id="file" accept="image/*" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProduct;
