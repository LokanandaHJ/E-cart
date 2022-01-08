import React from "react";
import Login from "../Auth/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../Auth/SignUP/SignUp";
import Dashboard from "../Products/Dashboard/Dashboard";
import { TOKEN } from "../UTLS/Constants";
import Profile from "../Products/Components/Profile/Profile";
import AddProducts from "../Products/Components/AddProducts/AddProducts";
import Navbar from "../Products/Navbar/Navbar";
import ProductList from "../Products/Components/ProductList/ProductList";
import ProductsDisplay from "../Products/Components/ProductsDisplay/ProductsDisplay";
import Cart from "../Products/Components/cart/Cart";

const Router = (props) => {
  console.log("Router.js");
  return (
    <>
      {localStorage.getItem(TOKEN) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem(TOKEN) ? (
              <Navigate to="/Home" />
            ) : (
              <Navigate to="/Login   " />
            )
          }
        ></Route>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Home" element={<Dashboard />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/Add/:id" element={<AddProducts />}></Route>
        <Route path="/Add" element={<AddProducts />}></Route>
        <Route path="/ProductList" element={<ProductList />}></Route>
        <Route path="/ProductsDisplay" element={<ProductsDisplay />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </>
  );
};

export default Router;
