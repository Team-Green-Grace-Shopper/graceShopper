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
    <div className="gcart">
      <div className="gcart_breadcrumbs">
        <Link to="/products" className="gcart_breadcrumb_link">
          <p>All Products</p>
        </Link>
        <p>&#187;</p>
        <p>Cart</p>
      </div>

      <div className="gcart_main">
        <div className="gcart_left">
          <p className="item_counter">Items ({totalItemNumber})</p>

          {!guestCart.length ? (
            <div className="gcart_empty">
              <p className="gcart_empty_message">No items in cart</p>
              <Link to="/products">
                <p className="gcart_empty_link">← Back To All Products</p>
              </Link>
            </div>
          ) : null}

          {guestCart &&
            guestCart.map((item, index) => {
              const updateHandler = async (event) => {
                event.preventDefault();
                console.log("update button clicked");
                item.quantity = quantity;
                setIsEdited(true);
              };

              subtotalTracker = subtotalTracker + item.quantity * item.price;
              setSubtotal(subtotalTracker);

              itemNumberTracker = itemNumberTracker + item.quantity;
              setTotalItemNumber(itemNumberTracker);

              return (
                <div key={item.id} className="gcart_item">
                  <Link to={`/products/${item.id}`}>
                    <img
                      className="item_image"
                      src={item.imageURL}
                      alt={item.name}
                    />
                  </Link>

                  <div className="item_info">
                    <Link
                      className="item_name_link"
                      to={`/products/${item.id}`}
                    >
                      <p className="item_name">{`${item.name} - ${item.size}`}</p>
                    </Link>
                    <button
                      className="item_button"
                      value={index}
                      onClick={deleteHandler}
                    >
                      Remove
                    </button>
                  </div>

                  <form className="quantity_form">
                    <>
                      <input
                        className="input_box"
                        type="number"
                        min="1"
                        defaultValue={item.quantity}
                        onChange={(event) => {
                          setQuantity(parseInt(event.target.value));
                          console.log(quantity);
                        }}
                      />
                    </>

                    <button className="item_button" onClick={updateHandler}>
                      Update
                    </button>
                  </form>

                  <div className="item_price">
                    <p>{`$${item.price * item.quantity}.00`}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="gcart_right">
          <div className="gcart_subtotal">
            <p>Subtotal</p>
            <p>{`$${subtotal}.00`}</p>
          </div>
          <Link to="/checkout/guest">
            <button className="gcart_checkout_button">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuestCart;
