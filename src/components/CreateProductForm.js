import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//name, description, price, imageURL
// cannot read properties of undefined reading 'message'
//that means a variable is undefined
//created but deleted
const CreateProduct = ({ api }) => {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  /* const [image, setImage] = useState(''); */
  const navigate = useNavigate();

  const onClickPostHandler = async (event) => {
    event.preventDefault();

<<<<<<< HEAD
    try {
      const response = await fetch(`${api}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            /* headers: {'Content-Type': 'multipart/form-data'} */
            /* Authorization: `Bearer ${user.token}`, */
          },
          body: JSON.stringify({
            name: nameValue,
            description: descriptionValue,
            price: priceValue,
            imageURL:
              "https://www.llbean.com/images/200801_emailimage_large.jpg",
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
=======
        try{
            const response = await fetch(`${api}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    /* headers: {'Content-Type': 'multipart/form-data'} */
                    /* Authorization: `Bearer ${user.token}`, */
                },
                body: JSON.stringify({
                    name: nameValue,
                    description: descriptionValue,
                    price: priceValue,
                    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIiszY77TwN_MW3k6Uhr81IUjpNYmzQFjThA&usqp=CAU',
                }),
            }),
            result = await response.json();
            console.log(result);

            if(result.ok) {
                navigate('/adminproducts');
            } else {
                throw new Error(result.error)
            }
        }catch (error) {
            alert(error)
        }       
    };
>>>>>>> main

  /* const onUploadFileHandler = (event) => {
        event.preventDefault();
        const files = event.target.files;
        setImage(new FormData());
        image.append('image', files[0]);
    } */

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
        step="1.00"
        type="number"
        name="price"
        value={priceValue}
        placeholder="price"
        onChange={(event) => {
          setPriceValue(event.target.value);
        }}
      />
      {/*  <lable for="file">Upload File:</lable>
            <input 
                type="file"
                id="file"
                accept="image/*"
            /> */}
<<<<<<< HEAD
      <button onClick={onClickPostHandler} type="submit">
        Submit
      </button>
    </form>
  );
};

=======
            <button onClick={onClickPostHandler} type="submit">Submit</button>
        </form>
    )
}
>>>>>>> main
export default CreateProduct;
