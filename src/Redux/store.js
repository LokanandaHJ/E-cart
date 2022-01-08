import React from "react";
import cartReducer from "./Reducers/cart.reducers";
import { createStore } from "redux";

const store = createStore(cartReducer);
export default store;
