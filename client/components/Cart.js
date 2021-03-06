import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { completeNewOrder } from '../store/orders';
import {
  fetchNewOrder,
  updateProduct,
  fetchDeleteOrderItem,
} from '../store/cart';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const [quantity, setQuantity] = useState('1');
  const orders = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const { guestItem } = useCart();

  const history = useHistory();

  useEffect(() => {
    dispatch(fetchNewOrder());
  }, []);

  const onChangeQuantity = (orderId, productId, quantity, salesPrice) => {
    dispatch(
      updateProduct({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
        salesPrice: salesPrice,
      })
    );
  };

  const complete = (id) => {
    dispatch(completeNewOrder({ id: id }, history));
  };

  const deleteProduct = (id) => {
    dispatch(fetchDeleteOrderItem({ id: id }));
  };

  const orderId = orders.map((order) => order.id);

  if (isLoggedIn) {
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
                  <div className="singleProductDisplay" key={product.id}>
                    <div>
                      <h2>{product.name}</h2>
                      <img src={product.imageUrl} />
                    </div>
                    <div className="priceDisplay">
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

                      <p>Price:${product.price}</p>
                      <p>
                        Total: $
                        {(product.orderItem.quantity * product.price).toFixed(
                          2
                        )}
                      </p>
                      <button onClick={() => deleteProduct(product.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        <button
          onClick={() => {
            complete(orderId[0]);
          }}
        >
          Proceed To Checkout
        </button>
      </div>
    );
  } else {
    if (guestItem[0] === undefined) {
      return (
        <div>
          <img src="https://st2.depositphotos.com/1010305/9903/i/600/depositphotos_99030142-stock-photo-dog-with-shopping-cart.jpg"></img>
        </div>
      );
    } else {
      return (
        <div>
          {guestItem.map((product) => {
            return (
              <div className="singleProductDisplay" key={product.id}>
                <div>
                  <h2>{product.productName}</h2>
                  <img src={product.imageUrl} />
                </div>
                <div className="priceDisplay">
                  <p>Quantity:{product.quantity}</p>
                  <p>Price:${product.salesPrice}</p>
                  <p>
                    Total: ${(product.quantity * product.salesPrice).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
};

export default Cart;
