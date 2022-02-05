import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GuestCart.css";
import { createCartItem, registerGuest, createOrder } from "../api/apiCalls";

const GuestCart = ({
  guestCart,
  subtotal,
  setSubtotal,
  totalItemNumber,
  setTotalItemNumber,
}) => {
  let subtotalTracker = 0;
  let itemNumberTracker = 0;

  const [quantity, setQuantity] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setIsEdited(false);
    setIsDeleted(false);
  }, [isEdited, isDeleted]);

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
      <p>Items ({totalItemNumber})</p>

      {guestCart &&
        guestCart.map((item, index) => {
          const updateHandler = async (event) => {
            event.preventDefault();
            console.log("update button clicked");
            item.quantity = quantity;
            setIsEdited(true);
          };

          // const {id, name, imageurl, itemquantity, size, price} = item

          subtotalTracker = subtotalTracker + item.quantity * item.price;
          setSubtotal(subtotalTracker);

          itemNumberTracker = itemNumberTracker + item.quantity;
          setTotalItemNumber(itemNumberTracker);

          return (
            <div key={item.id} className="item">
              <div className="item_left">
                <img className="teeImg" src={item.imageURL} alt={item.name} />

                <div>
                  <p>name: {item.name}</p>
                  <p>size: {item.size}</p>
                  <form>
                    <label>Quantity:</label>
                    <input
                      className="quantityInput"
                      type="number"
                      defaultValue={item.quantity}
                      onChange={(event) => {
                        setQuantity(parseInt(event.target.value));
                        console.log(quantity);
                      }}
                    />

                    <button onClick={updateHandler}>Update</button>

                    <button value={index} onClick={deleteHandler}>
                      Delete
                    </button>
                  </form>
                </div>
              </div>

              <div className="item_right">
                <p>price: {item.price * item.quantity}</p>
              </div>
            </div>
          );
        })}
      <br></br>
      <div className="subtotalLine">
        <p>Subtotal: $ {subtotal}</p>
      </div>

      <Link to="/checkout/guest">
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default GuestCart;
