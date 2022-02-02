import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import {
  getProductById,
  getCartIdByUserId,
  createCartItem,
} from "../api/apiCalls";
import { useParams } from "react-router-dom";

const SingleProduct = ({ guestCart, setGuestCart }) => {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [cartId, setCartId] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      let response = await getProductById(productId);
      setProduct(response);
    }
    loadProduct();

    // async function loadCartId() {
    //   let response = await getCartIdByUserId(4);
    //   setCartId(response);
    // }
    // loadCartId();
  }, [guestCart]);

  const guestItemObj = {
    name: product.name,
    imageURL: product.imageURL,
    quantity: quantity,
    size: size,
    price: product.price,
  };

  const guestAddHandler = (event) => {
    event.preventDefault();
    setGuestCart([...guestCart, guestItemObj]);
  };

  // const userItemObj = {
  //   orderId: cartId,
  //   product: product.id,
  //   quantity: quantity,
  //   size: size,
  //   price: product.price,
  // };

  // const userAddHandler = async (event) => {
  //   event.preventDefault();
  //   await createCartItem(userItemObj);
  // };

  return (
    <div>
      <Link to={`/products`}>
        <button>Back To All Products</button>
      </Link>
      <h2>Single Product Page</h2>
      <p>id:{product.id}</p>
      <p>name:{product.name}</p>
      <p>description:{product.description}</p>
      <p>price:{product.price}</p>
      <img src={product.imageURL} alt={product.description} />

      <form>
        <label>Size</label>
        <select
          className="sizeSelect"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        >
          <option defaultValue>Select a size</option>
          <option>SM</option>
          <option>MD</option>
          <option>LG</option>
        </select>
        <br></br>

        <label>Quantity</label>
        <input
          className="quantityInput"
          type="number"
          defaultValue="1"
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
      </form>

      {/* <button onClick={userAddHandler}>Add To Cart (u)</button> */}
      <button onClick={guestAddHandler}>Add To Cart (g)</button>
    </div>
  );
};

export default SingleProduct;
