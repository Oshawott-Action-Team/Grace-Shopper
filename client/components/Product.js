import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { products } = props;

  return (
    <div>
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
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Product;
