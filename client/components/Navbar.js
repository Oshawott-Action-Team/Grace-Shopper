import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <h1>Pawty City</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <span>Hello, {username[0].toUpperCase() + username.slice(1)}</span>
          <Link to="/home">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/newOrder">
            <img
              src="https://i.pinimg.com/originals/84/66/7e/84667ecd09e219d30420530aaee5c7ba.jpg"
              style={{ height: 60 }}
            />
            Cart
          </Link>

          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">All Products</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/newOrder">
            <img
              src="https://i.pinimg.com/originals/84/66/7e/84667ecd09e219d30420530aaee5c7ba.jpg"
              style={{ height: 60 }}
            />
            Cart
          </Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,

    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
