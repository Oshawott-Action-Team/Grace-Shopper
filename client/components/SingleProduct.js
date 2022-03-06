import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
// import { addOrderItem } from "../store/orderItem";

const SingleProduct = () => {
  const product = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, []);

  return (
    <div className="card">
      <h2>{product.name}</h2>
      <img src={product.imageUrl} />
      <p>
        Quantity:
        <input type="number" defaultValue="1" />
      </p>
      <p>${product.price}</p>
      <button>Add To Cart</button>
      <p>{product.description}</p>
    </div>
  );
};
export default SingleProduct;
