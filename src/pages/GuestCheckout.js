import React from "react";
import "./GuestCheckout.css";

const GuestCheckout = ({ guestCart }) => {
  const checkoutHandler = async (event) => {
    event.preventDefault();
    console.log("checkout button clicked");
    //create an order (with ordertype = 'order')
    //add all items to order
  };

  return (
    <div className="checkout">
      <h1>Guest Checkout</h1>
      <div className="main">
        <div className="left">
          <h3>Order Details</h3>
          {guestCart &&
            guestCart.map((item) => {
              return (
                <div className="item">
                  <p>name: {item.name}</p>
                  <img className="teeImg" src={item.imageURL} alt={item.name} />
                  <p>price: {item.price}</p>
                  <p>size: {item.size}</p>
                  <p>quantity: {item.quantity}</p>
                </div>
              );
            })}
        </div>
        <div className="right">
          <p>item 1 $</p>
          <p>item 2 $</p>
          <p>-----</p>
          <p>subtotal $</p>
          <p>shipping $</p>
          <p>tax $</p>
          <p>-----</p>
          <p>total $</p>
          <button onClick={checkoutHandler}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckout;
