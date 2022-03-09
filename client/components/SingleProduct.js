import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { useCart } from '../hooks/useCart';
import { fetchNewOrder } from '../store/cart';
import { useAuth } from '../hooks/useAuth';

const SingleProduct = () => {
  const [quantity, setQuantity] = useState('1');
  const product = useSelector((state) => state.singleProduct);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { isLoggedIn } = useAuth();
  const { addToGuestCart } = useCart();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchNewOrder());
  }, []);

  return (
    <div className="singleProductDisplay">
      <div>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
      </div>
      <div className="priceDisplay">
        <p>
          Quantity:
          <input
            type="number"
            onChange={(event) => setQuantity(event.target.value)}
            value={quantity}
            defaultValue={quantity}
            min="1"
          />
        </p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <button
          onClick={() => {
            if (isLoggedIn) {
              addToCart(productId, quantity, product.price);
              alert(
                `${quantity} ${product.name} costume(s) added to your cart`
              );
              dispatch(fetchNewOrder());
            } else {
              addToGuestCart(
                productId,
                product.name,
                product.imageUrl,
                quantity,
                product.price
              );
              alert(
                `${quantity} ${product.name} costume(s) added to your cart`
              );
            }
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};
export default SingleProduct;
