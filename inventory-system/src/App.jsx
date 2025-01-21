import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import AddBox from "./components/AddBox";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-box" element={<AddBox />} />
      </Routes>
    </>
  );
};

export default App;
