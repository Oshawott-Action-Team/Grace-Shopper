import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.productId);
  }

  render() {
    const product = this.props.product;
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
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
