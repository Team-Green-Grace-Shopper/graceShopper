import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Modal from "./components/Modal";
import Header from "./components/Header";
import Products from "./pages/Products";

const App = () => {
  return (
    <div className="App">
      {/* {isModalOpen ? <Modal /> : null} */}
      <Header />
      <Routes>
        <Route path="products" element={<Products />} />
      </Routes>
    </div>
  );
};

export default App;
