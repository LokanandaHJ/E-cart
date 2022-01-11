import React from "react";
import { useSelector } from "react-redux";
import "./Cart.css";

const Cart = () => {
  const data = useSelector((a) => a.cartItem);
  let amount = 0;
  data.map((item) => (amount += item.price));
  let i = 0;
  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => (
            <tr>
              <th scope="row">{++index}</th>
              <td>{items.name}</td>
              <td>
                <img
                  src={require(`../Accessories/${items.imageName}`)}
                  className="cartImage"
                />
              </td>
              <td>{items.size}</td>
              <td>{items.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <td>Total Amount = {amount}</td>
    </div>
  );
};

export default Cart;
