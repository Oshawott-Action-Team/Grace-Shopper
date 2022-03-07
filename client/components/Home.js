import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div className="home">
      <h3>
        Welcome to the Pawty, {username[0].toUpperCase() + username.slice(1)}
      </h3>
      <Link to="/products">
        <button>Start Shopping</button>
      </Link>
      <img src="https://media.istockphoto.com/photos/group-of-puppies-celebrating-a-new-year-picture-id1077972822?k=20&m=1077972822&s=612x612&w=0&h=_v6sNSaszK8zTQyEak-h_xuwL-EfHXtMnrIOtaxTeqw=" />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
