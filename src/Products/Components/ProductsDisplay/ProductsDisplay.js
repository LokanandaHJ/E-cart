import React, { useEffect } from "react";
import "./ProductDisplay.css";
import d from "../Accessories/d.jpg";
import { USER } from "../../../UTLS/Constants";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADDTOCART } from "../../../UTLS/Constants";

const ProductsDisplay = (props) => {
  const { reqData } = props;
  const path = `/products/${reqData._id}`;

  const deleteItem = () => {
    Axios.delete(path).then((res) => {
      props.getDelData(reqData._id);
    });
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch({ type: ADDTOCART, data: reqData });
  };

  return (
    <div className="conntainer d-flex">
      <div className="col">
        <div>Name: {reqData.name}</div>
        <div>Price: {reqData.price}</div>
        <div>Size: {reqData.size}</div>
        <div>Ratings: {reqData.ratings}</div>
        <img
          src={require(`../Accessories/${reqData.imageName}`)}
          className="img-thumbnail"
        />
        {JSON.parse(localStorage.getItem(USER)).role === "admin" ? (
          <div>
            <Link to={path}>
              <button className="btn btn-dark">Edit</button>
            </Link>
            <button className="btn btn-warning" onClick={deleteItem}>
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button onClick={addToCart}>Add to cart</button>
            <button>Buy Now</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductsDisplay;
