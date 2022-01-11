import React from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useEffect } from "react";
import ProductsDisplay from "../ProductsDisplay/ProductsDisplay";
import { Link } from "react-router-dom";
import "./ProductList.css";
import { Button } from "bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [search, setSearch] = useState("");
  const [resArray, setResArray] = useState([]);

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
        setResArray(productsFromDB);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get all products initially
  useEffect(() => getdata(), []);

  console.log("sortKeys", sortKey);

  const sortItems = () => {
    let filteredArr = [...products];
    if (sortKey === "priceHighToLow") {
      filteredArr = filteredArr.sort((a, b) => b.price - a.price);
    } else if (sortKey === "priceLowToHigh") {
      filteredArr = filteredArr.sort((a, b) => a.price - b.price);
    } else if (sortKey === "sizeSmallToLarge") {
      filteredArr = filteredArr.sort((a, b) => a.size - b.size);
    } else if (sortKey === "sizeLargeToSmall") {
      filteredArr = filteredArr.sort((a, b) => b.size - a.size);
    }

    filteredArr = search
      ? filteredArr.filter((product) => {
          return product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
            ? product
            : "";
        })
      : filteredArr;
    setResArray(filteredArr);
  };

  useEffect(() => {
    sortItems();
  }, [products, sortKey, search]);

  return (
    <div className="container-info">
      <div className="filter-sort">
        <input
          className=""
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortKey(e.target.value)}>
          <option isdisabled="true">SORT</option>
          <option value="priceHighToLow">Sort by Price High to Low </option>
          <option value="priceLowToHigh">Sort by Price Low to High</option>
          <option value="sizeSmallToLarge">Sort by size Small to Large</option>
          <option value="sizeLargeToSmall">Sort by size Large to Small</option>
        </select>
      </div>
      <div className="row">
        {resArray.length ? (
          resArray.map((reqData) => (
            <>
              <div className="col-3">
                <ProductsDisplay
                  reqData={reqData}
                  key={reqData._id}
                  getDelData={deleteHandler}
                />
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
