import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { completeNewOrder, fetchDeleteOrderItem } from "../store/orders";
import { fetchNewOrder, updateProduct } from "../store/cart";

const Cart = () => {
  const [quantity, setQuantity] = useState("1");
  const orders = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewOrder());
  }, []);

  console.log(quantity);

  const onChangeQuantity = (orderId, productId, quantity, salesPrice) => {
    // console.log(evt.target.value);

    dispatch(
      updateProduct({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
        salesPrice: salesPrice,
      })
    );
    // console.log(evt.target.value);
    // console.log(id);
    // orders[0].products.map((product) => {
    //   if (product.id === id) {
    //     product.orderItem.quantity = evt.target.value;
    //     return product;
    //   }
    // });
    // console.log(orders[0].products);
  };

  const complete = (id) => {
    dispatch(completeNewOrder({ id: id }));
  };

  const deleteProduct = (id) => {
    dispatch(fetchDeleteOrderItem({ id: id }));
  };

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

                  <p>Quantity:{product.orderItem.quantity}</p>
                  <p>
                    <select
                      onInput={(evt) => setQuantity(evt.target.value)}
                      onChange={() =>
                        onChangeQuantity(
                          order.id,
                          product.id,
                          quantity,
                          product.price
                        )
                      }
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </select>
                  </p>

                  <p>Price:{product.price}</p>
                  <p>Total: ${product.orderItem.quantity * product.price}</p>
                  <button onClick={() => deleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        );
      })}

      <button onClick={(id) => complete(orderId[0])}>
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Cart;

// export class Cart extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.load();
//   }
//   complete(id) {
//     this.props.completeOrder({ id: id });
//   }
//   componentDidUpdate(prevState) {
//     // console.log(prevstate);
//     if(prevState !== this.state){
//       return this.state
//     }
//   }

//   onChangeQuantity(evt, id) {
//     console.log(evt.target.value);
//     console.log(id);
//     this.props.orders[0].products.map((product) => {
//       if (product.id === id) {
//         product.orderItem.quantity = evt.target.value;
//         return product;
//       }
//     });
//     console.log(this.props.orders[0].products);
//   }

//   render() {
//     const orders = this.props.orders;

//     const orderId = this.props.orders.map((order) => order.id);

//     return orders[0] === undefined || orders[0].products.length === 0 ? (
//       <div>
//         <img src="https://st2.depositphotos.com/1010305/9903/i/600/depositphotos_99030142-stock-photo-dog-with-shopping-cart.jpg"></img>
//       </div>
//     ) : (
//       <div>
//         {orders.map((order) => {
//           return (
//             <div key={order.id}>
//               {order.products.map((product) => {
//                 return (
//                   <div className="card" key={product.id}>
//                     <h2>{product.name}</h2>
//                     <img src={product.imageUrl} />

//                     <p>Quantity:{product.orderItem.quantity}</p>
//                     <p>
//                       <input
//                         onChange={(e) => this.onChangeQuantity(e, product.id)}
//                         type="number"
//                         min="1"
//                       />
//                     </p>

//                     <p>Price:{product.orderItem.salesPrice}</p>
//                     <p>
//                       Total: $
//                       {product.orderItem.quantity *
//                         product.orderItem.salesPrice}
//                     </p>
//                     <button
//                       onClick={() =>
//                         this.props.deleteOrderItem({ id: product.id })
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           );
//         })}

//         <button onClick={(id) => this.complete(orderId[0])}>
//           Proceed To Checkout
//         </button>
//       </div>
//     );
//     //}
//   }
// }

// const mapState = (state) => {
//   return {
//     orders: state.orders.newOrder,
//   };
// };

// const mapDispatch = (dispatch, { history }) => {
//   return {
//     load: () => dispatch(fetchNewOrder()),
//     completeOrder: (id) => dispatch(completeNewOrder(id, history)),
//     deleteOrderItem: (id) => dispatch(fetchDeleteOrderItem(id)),
//   };
// };

// export default connect(mapState, mapDispatch)(Cart);
