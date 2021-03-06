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
  const [formIsDone, setFormIsDone] = useState(false);
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
    <div className="gcheckout">
      <div className="gcheckout_breadcrumbs">
        <Link to="/products" className="gcheckout_breadcrumb_link">
          <p>All Products</p>
        </Link>
        <p>&#187;</p>
        <Link to="/cart/guest" className="gcheckout_breadcrumb_link">
          <p>Cart</p>
        </Link>
        <p>&#187;</p>
        <p>Checkout</p>
      </div>

      <div className="gcheckout_main">
        <div className="gcheckout_left">
          <GuestCheckoutForm
            shipOption={shipOption}
            setShipOption={setShipOption}
            setEmail={setEmail}
            setFirstName={setFirstName}
            setFormIsDone={setFormIsDone}
          />
        </div>

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
        {guestCart &&
          guestCart.map((item) => {
            const orderItemObj = {
              orderId: 0,
              productId: item.id,
              quantity: item.quantity,
              size: item.size,
              price: item.price,
            };

            orderItems.push(orderItemObj);

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

export default GuestCheckout;
