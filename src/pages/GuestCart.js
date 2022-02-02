import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GuestCart.css";

const GuestCart = ({ guestCart }) => {
  const [quantity, setQuantity] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsDeleted(false);
  }, [quantity, isDeleted]);

  const deleteHandler = async (event) => {
    event.preventDefault();
    console.log("delete button clicked");
    const index = event.target.value;
    guestCart.splice(index, 1);
    setIsDeleted(true);
  };

  return (
    <div className="cart">
      <h1>Guest Cart</h1>
      <Link to="/products">
        <button>Back To Products</button>
      </Link>
      {guestCart &&
        guestCart.map((item, index) => {
          return (
            <div className="item">
              <p>name: {item.name}</p>
              <img className="teeImg" src={item.imageURL} alt={item.name} />
              <p>price: {item.price}</p>
              <p>size: {item.size}</p>

              <form>
                <label>Quantity:</label>
                <input
                  className="quantityInput"
                  type="number"
                  defaultValue={item.quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                    console.log(quantity);
                  }}
                />

                <button type="button">Update</button>
              </form>

              <br></br>
              <button value={index} onClick={deleteHandler}>
                Delete
              </button>
            </div>
          );
        })}
      <br></br>
      <Link to="/checkout/guest">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default GuestCart;
