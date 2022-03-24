import React from "react";
import Axios from "axios";
import axios from "axios";
import { Form } from "formik";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductsDisplay from "../ProductsDisplay/ProductsDisplay";
import { array } from "yup/lib/locale";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const deleteHandler = (ID) => {
    const newProducts = products.filter((delID) => delID._id !== ID);
    setProducts(newProducts);
  };

  const getdata = () => {
    Axios.get("/products")
      .then((res) => {
        console.log(res.data);
        const productsFromDB = res.data;
        setProducts(productsFromDB);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get all products initially
  useEffect(() => getdata(), []);

  return (
    <div className="container-info">
      <div className="row">
        {products.length ? (
          products.map((reqData) => (
            <>
              <div className="col-3">
                <ProductsDisplay reqData={reqData} getDelData={deleteHandler} />
              </div>
            </>
          ))
        ) : (
          <h2>
            No Products were found! Add some products{" "}
            <Link to="/Add">Here</Link>
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductList;
