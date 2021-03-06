import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import Home from './components/Home';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import { me } from './store';
import AllOrders from './components/AllOrders';
import Cart from './components/Cart';
import { Signup } from './components/SignUp';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            {/* <Redirect to="/home" /> */}
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route exact path="/orders" component={AllOrders} />
            <Route exact path="/newOrder" component={Cart} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/orders" component={AllOrders} />
            <Route exact path="/newOrder" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
