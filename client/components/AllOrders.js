import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/orders';

export class AllOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const orders = this.props.orders;
    return (
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              <h2>Order #{order.id} has been successfully placed!</h2>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.orders.completeOrder,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => dispatch(fetchOrders()),
  };
};

export default connect(mapState, mapDispatch)(AllOrders);
