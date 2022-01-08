import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsDisplay from "../Components/ProductsDisplay/ProductsDisplay.js";
import Navbar from "../Navbar/Navbar.js";
import ProductList from "../Components/ProductList/ProductList.js";

const Dashboard = (props) => {
  return (
    <div>
      <ProductList></ProductList>
    </div>
  );
};

export default Dashboard;
