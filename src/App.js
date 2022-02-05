import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
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
import PostCheckout from "./pages/PostCheckout";

const App = () => {
  const api = "http://localhost:4000/api";

  const [user, setUser] = useState(null);
  const [guestCart, setGuestCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipCost, setShipCost] = useState("-");
  const [shipOption, setShipOption] = useState("");
  const [totalItemNumber, setTotalItemNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [orderNum, setOrderNum] = useState(0);

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

    setSubtotal(0);
    setTotalItemNumber(0);
    navigate("/");
  }

  return (
    <div className="App">
      <Header userLogout={userLogout} user={user} />
      <Routes>
        <Route path="/" element={<Navigate replace to="/products" />} />
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
              setEmail={setEmail}
            />
          }
        />
        <Route
          path="checkout/user"
          element={
            <UserCheckout
              user={user}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              shipCost={shipCost}
              setShipCost={setShipCost}
              shipOption={shipOption}
              setShipOption={setShipOption}
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              orderNum={orderNum}
              setOrderNum={setOrderNum}
              totalItemNumber={totalItemNumber}
              setTotalItemNumber={setTotalItemNumber}
            />
          }
        />
        <Route
          path="cart/guest"
          element={
            <GuestCart
              guestCart={guestCart}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              totalItemNumber={totalItemNumber}
              setTotalItemNumber={setTotalItemNumber}
            />
          }
        />
        <Route
          path="checkout/guest"
          element={
            <GuestCheckout
              guestCart={guestCart}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              shipCost={shipCost}
              setShipCost={setShipCost}
              shipOption={shipOption}
              setShipOption={setShipOption}
              totalItemNumber={totalItemNumber}
              setTotalItemNumber={setTotalItemNumber}
              email={email}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              orderNum={orderNum}
              setOrderNum={setOrderNum}
            />
          }
        />

        <Route
          path="confirmation"
          element={
            <PostCheckout
              email={email}
              firstName={firstName}
              orderNum={orderNum}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
