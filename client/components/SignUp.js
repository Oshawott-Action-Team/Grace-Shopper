import React from "react";
import { connect } from "react-redux";
import { authenticateSignUp } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstname">
            <small>FirstName</small>
          </label>
          <input name="firstname" type="text" />
        </div>
        <div>
          <label htmlFor="lastname">
            <small>Lastname</small>
          </label>
          <input name="lastname" type="text" />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="address1">
            <small>Address1</small>
          </label>
          <input name="address1" type="text" />
        </div>
        <div>
          <label htmlFor="address2">
            <small>Address2</small>
          </label>
          <input name="address2" type="text" />
        </div>
        <div>
          <label htmlFor="city">
            <small>City</small>
          </label>
          <input name="city" type="text" />
        </div>
        <div>
          <label htmlFor="state">
            <small>State</small>
          </label>
          <input name="state" type="text" />
        </div>
        <div>
          <label htmlFor="postcode">
            <small>Postcode</small>
          </label>
          <input name="postcode" type="text" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const firstname = evt.target.firstname.value;
      const lastname = evt.target.lastname.value;
      const email = evt.target.email.value;
      const address1 = evt.target.address1.value;
      const address2 = evt.target.address2.value;
      const city = evt.target.city.value;
      const state = evt.target.state.value;
      const postcode = evt.target.postcode.value;
      dispatch(
        authenticateSignUp(
          username,
          password,
          firstname,
          lastname,
          email,
          address1,
          address2,
          city,
          state,
          postcode,
          formName
        )
      );
    },
  };
};

export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
