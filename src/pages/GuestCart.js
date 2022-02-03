import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GuestCart.css";

const GuestCart = ({ guestCart }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  let quantity = 0;

  useEffect(() => {
    setIsDeleted(false);
  }, [isDeleted]);

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
          const updateHandler = async (event) => {
            event.preventDefault();
            console.log("update button clicked");
            guestCart[index].quantity = quantity;
          };

          return (
            <div key={item.id} className="item">
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
                    quantity = event.target.value;
                    console.log(quantity);
                  }}
                />

                <button type="submit" onClick={updateHandler}>
                  Update
                </button>
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
