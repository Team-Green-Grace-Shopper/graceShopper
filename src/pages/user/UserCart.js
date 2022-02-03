import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserCart.css";
import {
  getCartByUser,
  updateCartItem,
  deleteCartItem,
} from "../../api/apiCalls";

const UserCart = (props) => {
  const { userId } = useParams();

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    async function loadCart() {
      let response = await getCartByUser(userId);
      setCart(response);
    }
    loadCart();
    setIsDeleted(false);
    setIsEdited(false);
  }, [userId, isEdited, isDeleted]);

  return (
    <div className="cart">
      <h1>User Cart</h1>
      <Link to="/products">
        <button>Back To Products</button>
      </Link>

      {cart.map((item) => {
        const deleteHandler = async (event) => {
          event.preventDefault();
          console.log("delete button clicked");
          await deleteCartItem(item.orderItemsId);
          setIsDeleted(true);
        };

        return (
          <div key={item.orderItemsId} className="item">
            <p>order id: {item.orderId}</p>
            <p>order item id: {item.orderItemsId}</p>
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
            </form>

            <br></br>
            <button onClick={deleteHandler}>Delete</button>
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

export default UserCart;
