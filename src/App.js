import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT COMPONENTS
import Products from "./pages/Products";

const App = () => {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="products"
          element={<Products products={products} setProducts={setProducts} />}
        />
      </Routes>
    </div>
  );
};

export default App;
