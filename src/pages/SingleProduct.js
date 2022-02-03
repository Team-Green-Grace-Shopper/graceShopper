import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SingleProduct.css";
import {
  getProductById,
  getCartIdByUserId,
  createCartItem,
} from "../api/apiCalls";
import { useParams } from "react-router-dom";

const SingleProduct = ({ user, guestCart, setGuestCart }) => {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      let response = await getProductById(productId);
      setProduct(response);
    }
    loadProduct();

    if (user) {
      async function loadCartId() {
        let response = await getCartIdByUserId(user.id);
        setCartId(response[0].id);
      }
      loadCartId();
    }
  }, [productId, user]);

  const guestItemObj = {
    id: product.id,
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

  const userItemObj = {
    orderId: cartId,
    productId: product.id,
    quantity: quantity,
    size: size,
    price: product.price,
  };

  const userAddHandler = async (event) => {
    event.preventDefault();
    await createCartItem(userItemObj);
  };

  return (
    <div className="singleProduct">
      <div className="sp_main">
        <div className="left">
          <Link to={`/products`}>
            <button>Back To All Products</button>
          </Link>
          <img
            className="teeImg"
            src={product.imageURL}
            alt={product.description}
          />
        </div>

        <div className="right">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{product.price}</p>

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

          {user ? (
            <button onClick={userAddHandler}>Add To Cart (u)</button>
          ) : (
            <button onClick={guestAddHandler}>Add To Cart (g)</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
