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
  const [feedback, setFeedback] = useState("");

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
  }, [productId, user, feedback]);

  const guestItemObj = {
    id: product.id,
    name: product.name,
    imageURL: product.imageURL,
    quantity: parseInt(quantity),
    size: size,
    price: product.price,
  };

  const guestAddHandler = (event) => {
    event.preventDefault();
    if (!size) {
      setFeedback("Please select a size");
    } else {
      setGuestCart([...guestCart, guestItemObj]);
      setFeedback("Added to cart!");
    }
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
    if (!size) {
      setFeedback("Please select a size");
    } else {
      await createCartItem(userItemObj);
      setFeedback("Added to cart!");
    }
  };

  const imageOnLoadHandler = () => {
    let element = document.querySelector(".sp_img");
    element.classList.add("fade-in");
  };

  return (
    <div className="singleProduct">
      <div className="sp_breadcrumbs">
        <Link to="/products" className="sp_breadcrumb_link">
          <p>All Products</p>
        </Link>
        <p>&#187;</p>
        <p>{product.name}</p>
      </div>
      <div className="sp_main">
        <div className="sp_left">
          <img
            onLoad={imageOnLoadHandler}
            className="sp_img"
            src={product.imageURL}
            alt={product.description}
          />
        </div>

        <div className="sp_right">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>{`$${product.price}.00`}</p>

          <form className="sp_form">
            <div>
              <label>Size</label>
              <select
                className="sizeSelect"
                onChange={(event) => {
                  setSize(event.target.value);
                  setFeedback("");
                }}
                defaultValue="default"
                required
              >
                <option disabled value="default">
                  Select a size
                </option>
                <option>XS</option>
                <option>SM</option>
                <option>MD</option>
                <option>LG</option>
                <option>XL</option>
              </select>
            </div>

            <div>
              <label>Quantity</label>
              <input
                className="quantityInput"
                type="number"
                min="1"
                defaultValue="1"
                onChange={(event) => {
                  setQuantity(event.target.value);
                  setFeedback("");
                }}
              />
            </div>

            {user ? (
              <button
                className="sp_submit_button"
                type="submit"
                onClick={userAddHandler}
              >
                Add To Cart (u)
              </button>
            ) : (
              <button
                className="sp_submit_button"
                type="submit"
                onClick={guestAddHandler}
              >
                Add To Cart (g)
              </button>
            )}

            {feedback ? <p className="sp_feedback">{feedback}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
