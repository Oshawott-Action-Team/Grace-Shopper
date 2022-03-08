import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  fetchNewOrder,
  completeNewOrder,
  fetchDeleteOrderItem,
} from '../store/orders';

export class Cart extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.load();
  }
  complete(id) {
    this.props.completeOrder({ id: id });
  }

  render() {
    // console.log('props is below:');
    // console.log(this.props);
    const orders = this.props.orders || [];

    // console.log('orders is below:');
    // console.log(orders);
    const orderId = this.props.orders.map((order) => order.id);
    //console.log(orderId[0]);
    return orders[0] === undefined || orders[0].products.length === 0 ? (
      <div>
        <img src="https://st2.depositphotos.com/1010305/9903/i/600/depositphotos_99030142-stock-photo-dog-with-shopping-cart.jpg"></img>
      </div>
    ) : (
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              {order.products.map((product) => {
                return (
                  <div className="card" key={product.id}>
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} />
                    <p>Quantity: {product.orderItem.quantity}</p>
                    <p>Unit Price: {product.orderItem.salesPrice}</p>
                    <p>
                      Total: $
                      {product.orderItem.quantity *
                        product.orderItem.salesPrice}
                    </p>
                    <button
                      onClick={() => {
                        this.props.deleteOrderItem({ id: product.id });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}

        <button onClick={(id) => this.complete(orderId[0])}>
          Proceed To Checkout
        </button>
      </div>
    );
    //}
  }
}

const mapState = (state) => {
  return {
    orders: state.orders.newOrder,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    load: () => dispatch(fetchNewOrder()),
    completeOrder: (id) => dispatch(completeNewOrder(id, history)),
    deleteOrderItem: (id) => dispatch(fetchDeleteOrderItem(id)),
  };
};

export default connect(mapState, mapDispatch)(Cart);
