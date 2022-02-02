import React from "react";
import "./GuestCheckout.css";

const Checkout = ({ guestCart }) => {
  const checkoutHandler = async (event) => {
    event.preventDefault();
    console.log("checkout button clicked");
    //create an order (with ordertype = 'order')
    //add all items to order
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="main">
        <div className="left">
          <h3>User Info</h3>
          <form>
            <label>email</label>
            <input />
            <br></br>

            <label>phone</label>
            <input />
            <br></br>

            <label>first name</label>
            <input />
            <br></br>

            <label>last name</label>
            <input />
            <br></br>

            <label>address</label>
            <input />
            <br></br>

            <label>city</label>
            <input />
            <br></br>

            <label>state</label>
            <input />
            <br></br>

            <label>zip code</label>
            <input />
            <br></br>

            <button type="submit">Save and Continue</button>
            <button type="button">Edit</button>
          </form>
          <h3>Shipping Option</h3>
          <form>
            <input type="radio" />
            <label>Standard shipping (3-7 days) $6</label>
            <br></br>

            <input type="radio" />
            <label>Express shipping (2-4 days) $15</label>
            <br></br>

            <input type="radio" />
            <label>Next Day Shipping $25</label>

            <button type="submit">Save and Continue</button>
            <button type="button">Edit</button>
          </form>
          <h3>Payment</h3>
          <form>
            <label>First Name</label>
            <input />
            <br></br>

            <label>Last Name</label>
            <input />
            <br></br>

            <label>CC #</label>
            <input />
            <br></br>

            <label>Exp</label>
            <input />
            <br></br>

            <label>CVV/CVC</label>
            <input />
            <br></br>

            <label>Billing Address</label>
            <input />
            <br></br>

            <button type="submit">Save</button>
            <button type="button">Edit</button>
          </form>
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
      <div className="bottom">
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
    </div>
  );
};

export default Checkout;
