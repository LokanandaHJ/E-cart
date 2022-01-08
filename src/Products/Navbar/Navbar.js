import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { USER } from "../../UTLS/Constants";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartdata = useSelector((a) => a.cartItem);
  const number = cartdata.length;
  console.log(number);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            E-SHOP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {JSON.parse(localStorage.getItem(USER)).role === "admin" ? (
                  <Link className="navbar-brand" to={"/Add"}>
                    AddProducts
                  </Link>
                ) : null}
              </li>

              <li className="nav-item">
                <Link className="navbar-brand" to={"/Profile"}>
                  Profile
                </Link>
              </li>
            </ul>

            <Link className="navbar-brand" to={"/cart"}>
              <button className="btn btn-outline-success">
                My Cart {number > 0 ? number : null}
              </button>
            </Link>

            <form className="d-flex">
              <Link className="navbar-brand" to={"/Login"}>
                <button
                  className="btn btn-outline-success"
                  onClick={() => localStorage.clear()}
                >
                  Logout
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
