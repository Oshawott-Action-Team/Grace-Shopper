import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import { useCart } from "../hooks/useCart";
import { fetchNewOrder } from "../store/cart";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState("1");
  const product = useSelector((state) => state.singleProduct);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchNewOrder());
  }, []);

  return (
    <div className="card">
      <div>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
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
      </div>
      <button
        onClick={() => {
          addToCart(productId, quantity, product.price);
          alert(`${quantity} ${product.name} costume(s) added to your cart`);
          dispatch(fetchNewOrder());
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};
export default SingleProduct;
