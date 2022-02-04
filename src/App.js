import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Header from "./components/Header";
import Products from "./pages/Products";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SingleProduct from "./pages/SingleProduct";
/* import CreateProduct from "./components/CreateProductForm"; */
import GuestCart from "./pages/GuestCart";
import GuestCheckout from "./pages/GuestCheckout";
import UserCart from "./pages/user/UserCart";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./components/AdminProducts";
import UserCheckout from "./pages/user/UserCheckout";

const App = () => {
  const api = "http://localhost:4000/api";

  const [user, setUser] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipCost, setShipCost] = useState("-");
  const [shipOption, setShipOption] = useState("");
  // const [total, setTotal] = useState(subtotal);
  const [totalItemNumber, setTotalItemNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveUser = localStorage.getItem("user");
    if (retrieveUser) {
      const userObject = JSON.parse(retrieveUser);
      setUser(userObject);
    }
  }, []);

  function setLocalStorageUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function userLogout() {
    console.log("you have logged out");
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="App">
      <Header userLogout={userLogout} user={user} />
      <Routes>
        <Route path="products" element={<Products />} />
        <Route
          path="/login"
          element={
            <Login api={api} setLocalStorageUser={setLocalStorageUser} />
          }
        />
        <Route path="/signup" element={<Signup api={api} />} />
        <Route
          path="products/:productId"
          element={
            <SingleProduct
              user={user}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
            />
          }
        />
        <Route path="users/all" user={user} element={<AdminUsers />} />
        {/* <Route
          path="/createproduct"
          element={<CreateProduct api={api} user={user} />}
        /> */}
        <Route
          path="/adminproducts"
          element={<AdminProducts api={api} user={user} />}
        />
        <Route
          path="cart/user"
          element={
            <UserCart
              user={user}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              totalItemNumber={totalItemNumber}
              setTotalItemNumber={setTotalItemNumber}
            />
          }
        />
        <Route
          path="checkout/user"
          element={
            <UserCheckout
              user={user}
              subtotal={subtotal}
              shipCost={shipCost}
              setShipCost={setShipCost}
              shipOption={shipOption}
              setShipOption={setShipOption}
              totalItemNumber={totalItemNumber}
            />
          }
        />
        <Route
          path="cart/guest"
          element={<GuestCart guestCart={guestCart} />}
        />
        <Route
          path="checkout/guest"
          element={<GuestCheckout guestCart={guestCart} />}
        />
      </Routes>
    </div>
  );
};

export default App;
