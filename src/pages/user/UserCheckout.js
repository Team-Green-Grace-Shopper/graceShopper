import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserCheckout.css";
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
    <div className="user_checkout">
      <Link to="cart/user">
        <button>Back to cart</button>
      </Link>
      <h1>User Checkout Page</h1>

      <div className="main">
        <div className="left">
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
        <div className="right">
          <div className="summaryLine">
            <p>Items ({totalItemNumber})</p>
            <p>$ {subtotal}</p>
          </div>

          <p>shipping $ {shipCost}</p>
          <p>-----</p>
          <p>total $ {total}</p>
          <button disabled={!formIsDone ? true : false} onClick={submitHandler}>
            Place Order
          </button>
        </div>
      </div>

      <div className="bottom">
        <p>Items ({totalItemNumber})</p>

        {cart.map((item) => {
          return (
            <div key={item.orderItemsId} className="item">
              <div className="item_left">
                <img className="teeImg" src={item.imageURL} alt={item.name} />
                <div>
                  <p>name: {item.name}</p>
                  <p>size: {item.size}</p>
                  <p>quantity: {item.quantity}</p>
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
      </div>
    </div>
  );
};

export default UserCheckout;
