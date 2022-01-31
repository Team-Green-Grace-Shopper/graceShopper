import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Modal from "./components/Modal";
import Header from "./components/Header";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  return (
    <div className="App">
      {/* {isModalOpen ? <Modal /> : null} */}
      <Header />
      <Routes>
        <Route path="products" element={<Products />} />
        <Route
          path = "products/:id"
          element = {<SingleProduct />}
        />
      </Routes>
    </div>
  );
};

export default App;
