import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/orders";

// const AllOrders = () => {
//   const orders = useSelector((state) => state.orders);
//   const dispatch = useDispatch();
//   const {id} = useParams()

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, []);

//   console.log(orders);
//   return (
//     <div>
//       {orders.map((order) => {
//         <ui>
//           <li>{order.id}</li>
//           <li>{order.orderStatus}</li>
//         </ui>;
//       })}
//     </div>
//   );
// };

// export default AllOrders;

export class AllOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const orders = this.props.orders;
    console.log(orders);
    return (
      <div>
        {orders.map((order) => {
          return (
            <div key={order.id}>
              <h2>{order.id}</h2>
              <h2>{order.orderStatus}</h2>
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
