import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { TOKEN } from "./UTLS/Constants";
import { Provider } from "react-redux";
import store from "./Redux/store";

const token = localStorage.getItem(TOKEN);
axios.defaults.baseURL = "https://vast-forest-59040.herokuapp.com";
axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${token}`;
  console.log(req);
  return req;
});

axios.interceptors.response.use((res) => {
  console.log(res);
  return res;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
