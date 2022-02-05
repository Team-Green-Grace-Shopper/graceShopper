import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./GuestCheckout.css";
import GuestCheckoutForm from "../components/GuestCheckoutForm";
import { registerGuest, createOrder, createCartItem } from "../api/apiCalls";

const GuestCheckout = ({
  guestCart,
  subtotal,
  setSubtotal,
  shipCost,
  setShipCost,
  shipOption,
  setShipOption,
  totalItemNumber,
  setTotalItemNumber,
  email,
  setEmail,
  setFirstName,
  setOrderNum,
}) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(subtotal);
  const orderItems = [];

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

    //create guest user
    const response = await registerGuest(email);

    // create order with guest id
    const orderObj = {
      userId: response.user.id,
      orderType: "order",
    };
    const order = await createOrder(orderObj);
    setOrderNum(order[0].id);

    //change guestcart items to order items
    orderItems.forEach((item) => {
      item.orderId = order[0].id;
    }); //add order id to every item obj

    await Promise.all(orderItems.map(createCartItem));

    //reset # of items and subtotal
    setTotalItemNumber(0);
    setSubtotal(0);

    //redirect page
    navigate("/confirmation");
  };

  return (
    <div className="guest_checkout">
      <Link to="/cart/guest">
        <button>Back to cart</button>
      </Link>
      <h1>User Checkout Page</h1>

      <div className="main">
        <div className="left">
          <GuestCheckoutForm
            shipOption={shipOption}
            setShipOption={setShipOption}
            setEmail={setEmail}
            setFirstName={setFirstName}
          />
        </div>

        <div className="right">
          <div className="summaryLine">
            <p>Items ({totalItemNumber})</p>
            <p>$ {subtotal}</p>
          </div>

          <p>shipping $ {shipCost}</p>
          <p>-----</p>
          <p>total $ {total}</p>
          <button onClick={submitHandler}>Place Order</button>
        </div>
      </div>

      <div className="bottom">
        <p>Items ({totalItemNumber})</p>
        {guestCart &&
          guestCart.map((item, index) => {
            const orderItemObj = {
              orderId: 0,
              productId: item.id,
              quantity: item.quantity,
              size: item.size,
              price: item.price,
            };

            orderItems.push(orderItemObj);

            return (
              <div key={item.id} className="item">
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

export default GuestCheckout;
