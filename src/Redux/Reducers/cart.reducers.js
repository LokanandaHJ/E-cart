import React from "react";
import { ADDTOCART } from "../../UTLS/Constants";
const initialState = {
  cartItem: [],
};

const cartReducer = (state = initialState, action) => {
  const { data } = action;

  switch (action.type) {
    case ADDTOCART: {
      const newArray = [...state.cartItem];
      // console.log(data, "data");

      let index = newArray.findIndex((item) => item._id === data._id);
      index >= 0
        ? (newArray[index].count += 1)
        : newArray.push({ ...data, count: 1 });

      // console.log("cart", newArray);

      return { ...state, cartItem: newArray };
    }

    default:
      return { ...state };
  }
};

export default cartReducer;
