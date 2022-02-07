import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../GuestCheckout.css";
import UserCheckoutForm from "../../components/UserCheckoutForm";

import {
  getCartByUser,
  getCartIdByUserId,
  checkoutCart,
  createOrder,
} from "../../api/apiCalls";

const UserCheckout = ({
  user,
  subtotal,
  setSubtotal,
  shipCost,
  setShipCost,
  shipOption,
  setShipOption,
  totalItemNumber,
  setTotalItemNumber,
  setEmail,
  setFirstName,
  setOrderNum,
}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(subtotal);
  const [formIsDone, setFormIsDone] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (shipOption && shipOption.includes("Standard")) {
      setShipCost(6);
      setTotal(subtotal + parseInt(shipCost));
    } else if (shipOption && shipOption.includes("Express")) {
      setShipCost(15);
      setTotal(subtotal + parseInt(shipCost));
    } else if (shipOption && shipOption.includes("Next")) {
      setShipCost(25);
      setTotal(subtotal + parseInt(shipCost));
    }
  }, [shipOption, setShipCost, setTotal, subtotal, shipCost]);

  const submitHandler = async (event) => {
    event.preventDefault();

    //change type from 'cart' to 'order'
    const response = await getCartIdByUserId(user.id);
    setOrderNum(response[0].id);

    await checkoutCart(response[0].id);

    //make new empty cart
    const orderData = {
      userId: user.id,
      orderType: "cart",
    };
    await createOrder(orderData);

    //reset # of items and subtotal
    setTotalItemNumber(0);
    setSubtotal(0);

    //redirect page
    navigate("/confirmation");
  };

  return (
    <div className="gcheckout">
      <div className="gcheckout_breadcrumbs">
        <Link to="/products" className="gcheckout_breadcrumb_link">
          <p>All Products</p>
        </Link>
        <p>&#187;</p>
        <Link to="/cart/user" className="gcheckout_breadcrumb_link">
          <p>Cart</p>
        </Link>
        <p>&#187;</p>
        <p>Checkout</p>
      </div>

      <div className="gcheckout_main">
        <div className="gcheckout_left">
          <UserCheckoutForm
            user={user}
            setFirstName={setFirstName}
            setEmail={setEmail}
            shipOption={shipOption}
            setShipOption={setShipOption}
            setFormIsDone={setFormIsDone}
          />
        </div>

        {/* --------ORDER SUMMARY-------- */}
        <div className="gcheckout_right">
          <div className="summary_line">
            <p>Items ({totalItemNumber})</p>
            <p>{`$${subtotal}.00`}</p>
          </div>

          <div className="summary_line">
            <p>Shipping</p>
            {shipCost === "-" ? <p>{shipCost}</p> : <p>{`$${shipCost}.00`}</p>}
          </div>

          <div className="total_line">
            <p>Total</p>
            <p>{`$${total}.00`}</p>
          </div>

          <button
            disabled={!formIsDone ? true : false}
            className="place_order_button"
            onClick={submitHandler}
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="bottom">
        {cart.map((item) => {
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
                <p>Quantity: {item.quantity}</p>
              </div>

              <div className="item_price">
                <p>{`$${item.price * item.quantity}.00`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCheckout;
