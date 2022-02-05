//guest checkout handler
const checkoutHandler = async (event) => {
  event.preventDefault();
  //create guest user
  // const guest = await registerGuest(email);

  //create order with guest id
  // const order = await createOrder(guest.id, "order");

  //change guestcart items to order items
  // const orderItemObj = {
  //   orderId: order.id,
  //   productId: item.id,
  //   quantity: item.quantity,
  //   size: item.size,
  //   price: item.price
  // }
  //const item = await createCartItem(orderItemObj)
};

//user checkout handler
const checkoutHandler = async (event) => {
  event.preventDefault();

  //change type from 'cart' to 'order'
  const response = await getCartIdByUserId(user.id);
  console.log("checkout handler 0, response[0].id", response[0].id);

  const newOrder = await checkoutCart(response[0].id);
  console.log("checkout handler 1, newOrder: ", newOrder);

  //make new empty cart
  const orderData = {
    userId: user.id,
    orderType: "cart",
  };
  const newCart = await createOrder(orderData);
  console.log("checkout handler 2, newCart: ", newCart);
};

//old user checkout
const UserCheckout = ({
  user,
  subtotal,
  shipCost,
  setShipCost,
  shipOption,
  setShipOption,
  totalItemNumber,
}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(subtotal);

  useEffect(() => {
    if (user) {
      const loadCart = async () => {
        const response = await getCartByUser(user.id);
        setCart(response);
      };
      loadCart();
    }
  }, [user, setCart]);

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

  const checkoutHandler = async (event) => {
    event.preventDefault();
    console.log("checkout button clicked");
    //call checkout function
  };

  return (
    <div className="checkout">
      <h1>User Checkout</h1>
      <div className="main">
        {/* ---------USER INFO FORMS-------- */}
        <div className="left">
          <UserCheckoutForm
            user={user}
            shipOption={shipOption}
            setShipOption={setShipOption}
          />
        </div>

        {/* --------ORDER SUMMARY-------- */}
        <div className="right">
          <div className="summaryLine">
            <p>Items ({total})</p>
            <p>$ {subtotal}</p>
          </div>

          <p>shipping $ {shipCost}</p>
          <p>-----</p>
          <p>total $ {total}</p>
          <button onClick={checkoutHandler}>Place Order</button>
        </div>
      </div>

      {/* --------ORDER ITEMS--------  */}
      <div className="bottom">
        <h3>Order Details</h3>
        {cart &&
          cart.map((item) => {
            return (
              <div key={item.orderItemsId} className="item">
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
