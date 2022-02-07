import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../GuestCart.css";
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

    setIsDeleted(false);
    setIsEdited(false);
  }, [user, isEdited, isDeleted]);

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
          {!cart.length ? (
            <div className="gcart_empty">
              <p className="gcart_empty_message">No items in cart</p>
              <Link to="/products">
                <p className="gcart_empty_link">← Back To All Products</p>
              </Link>
            </div>
          ) : null}
          {cart.map((item) => {
            const deleteHandler = async (event) => {
              event.preventDefault();
              console.log("delete button clicked");

              await deleteCartItem(item.orderItemsId);
              setIsDeleted(true);
            };

            const editHandler = async (event) => {
              event.preventDefault();
              console.log("edit button clicked");
              await updateCartItem(item.orderItemsId, quantity);
              setIsEdited(true);
            };

            subtotalTracker = subtotalTracker + item.quantity * item.price;
            setSubtotal(subtotalTracker);

            itemNumberTracker = itemNumberTracker + item.quantity;
            setTotalItemNumber(itemNumberTracker);

            return (
              <div key={item.orderItemsId} className="gcart_item">
                <Link to={`/products/${item.id}`}>
                  <img
                    className="item_image"
                    src={item.imageURL}
                    alt={item.name}
                  />
                </Link>

                <div className="item_info">
                  <Link className="item_name_link" to={`/products/${item.id}`}>
                    <p className="item_name">{`${item.name} - ${item.size}`}</p>
                  </Link>

                  <button className="item_button" onClick={deleteHandler}>
                    Delete
                  </button>
                </div>

                <form className="quantity_form">
                  <>
                    <input
                      className="quantityInput"
                      type="number"
                      min="1"
                      defaultValue={item.quantity}
                      onChange={(event) => {
                        const numQuantity = parseInt(event.target.value);
                        setQuantity(numQuantity);
                      }}
                    />
                  </>

                  <button className="item_button" onClick={editHandler}>
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
          <Link to="/checkout/user">
            <button className="gcart_checkout_button">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
