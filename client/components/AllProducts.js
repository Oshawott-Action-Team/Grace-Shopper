import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
// import Createproducts from "./Createproducts";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      <h2 className="section-title">All Products</h2>
      {/* for each product, create a card containing the name, price, image, and buttons to add to cart and view more  */}
      <ul className="container">
        {products.map((product) => {
          return (
            <div className="card" key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imageUrl} />
              <p>${product.price}</p>
              <Link to={`/products/${product.id}`}>
                <button>See More</button>
              </Link>
              {/* <Link to={`/products/${product.id}/addToCart`}>
                  <button>Add To Cart</button>
                </Link> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default AllProducts;
