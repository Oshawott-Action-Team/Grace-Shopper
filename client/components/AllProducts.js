import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
// import Createproducts from "./Createproducts";

export class AllProducts extends React.Component {
  //when the page first renders, use the thunk to fetch all the products
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div>
        <h2 className="section-title">All Products</h2>
        {/* for each product, create a card containing the name, price, image, and buttons to add to cart and view more  */}
        <ul className="container">
          {this.props.products.map((product) => {
            return (
              <div className="card" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                  <img src={product.imageUrl} />
                  <p>${product.price}</p>
                  <Link to={`/products/${product.id}`}>
                    <button>See More</button>
                  </Link>
                  <Link to={`/products/${product.id}/addToCart`}>
                    <button>Add To Cart</button>
                  </Link>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    load: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
