import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchNewOrder } from "../store/orders";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    // const products = this.props.orders[0].products || [];
    // //console.log(orders);
    // return (
    //   <div>
    //     {products.map((product) => {
    //       return (
    //         <div>
    //           <h2>{product.id}</h2>

    //           <h2>{product.orderStatus}</h2>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );
    const orders = this.props.orders;
    console.log(orders);
    return (
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              {order.products.map((product) => {
                return (
                  <div className="card" key={product.id}>
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} />
                    <p>${product.price}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => dispatch(fetchNewOrder()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
