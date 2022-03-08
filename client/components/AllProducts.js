import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products";
import Product from "./Product";
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
      <Product products={products} />
    </div>
  );
};

export default AllProducts;
