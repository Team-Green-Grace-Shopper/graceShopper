import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserCart.css";
import {
  getCartByUser,
  updateCartItem,
  deleteCartItem,
} from "../../api/apiCalls";

const UserCart = ({
  user,
  subtotal,
  setSubtotal,
  totalItemNumber,
  setTotalItemNumber,
}) => {
  let subtotalTracker = 0;
  let itemNumberTracker = 0;
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    let userId = 0;
    if (user) {
      userId = user.id;
    }

    async function loadCart() {
      let response = await getCartByUser(userId);
      setCart(response);
    }
    loadCart();
  }, [user]);

  // useEffect(() => {
  //   setSubtotal(subtotalTracker);
  // }, [setSubtotal, subtotalTracker]);

  useEffect(() => {
    setIsDeleted(false);
    setIsEdited(false);
  }, [isEdited, isDeleted]);

  return (
    <div className="cart">
      <h1>User Cart</h1>
      <Link to="/products">
        <button>Back To Products</button>
      </Link>
      <p>Items ({totalItemNumber})</p>

      {cart.map((item, index) => {
        const deleteHandler = async (event) => {
          event.preventDefault();
          console.log("delete button clicked");
          await deleteCartItem(item.orderItemsId);
          setIsDeleted(true);
        };

        console.log("typeof quantity: ", typeof item.quantity);

        subtotalTracker = subtotalTracker + item.quantity * item.price;
        console.log("index: ", index);
        console.log("subtotalTracker: ", subtotalTracker);
        setSubtotal(subtotalTracker);

        itemNumberTracker = itemNumberTracker + item.quantity;
        setTotalItemNumber(itemNumberTracker);

        return (
          <div key={item.orderItemsId} className="item">
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
                      const numQuantity = parseInt(event.target.value);
                      setQuantity(numQuantity);
                    }}
                  />

                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      await updateCartItem(item.orderItemsId, quantity);
                      setIsEdited(true);
                    }}
                  >
                    Update
                  </button>
                  <button onClick={deleteHandler}>Delete</button>
                </form>
              </div>
            </div>

            <div className="item_right">
              <p>price: {item.price}</p>
            </div>
          </div>
        );
      })}
      <br></br>
      <div className="subtotalLine">
        <p>Subtotal: $ {subtotal}</p>
      </div>
      <br></br>
      <Link to={`/checkout/user`}>
        <button>Checkout</button>
      </Link>
    </div>
  );
};

export default UserCart;
