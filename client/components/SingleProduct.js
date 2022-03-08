import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../store/singleProduct';
import { useCart } from '../hooks/useCart';
import { fetchNewOrder } from '../store/orders';

const SingleProduct = () => {
  const [quantity, setQuantity] = useState('1');
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
          />
        </p>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      {/* <button onClick={() => addProduct(productId, quantity, product.price)}> */}
      <button onClick={() => addToCart(productId, quantity, product.price)}>
        Add To Cart
      </button>
    </div>
  );
};
export default SingleProduct;

// class SingleProduct extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       quantity: "1",
//     };
//   }
//   componentDidMount() {
//     this.props.loadProduct(this.props.match.params.productId);
//   }
//   addProduct(id, quantity, price) {
//     this.props.createCart({ id: id, quantity: quantity, salesPrice: price });
//   }
//   updateQuantity(evt) {
//     this.setState({ quantity: evt.target.value });
//   }

//   render() {
//     const product = this.props.product;
//     return (
//       <div className="card">
//         <h2>{product.name}</h2>
//         <img src={product.imageUrl} />
//         <p>
//           Quantity:
//           <input
//             type="number"
//             onChange={(e) => this.updateQuantity(e)}
//             value={this.state.quantity}
//             min="1"
//           />
//         </p>
//         <p>${product.price}</p>
//         <button
//           onClick={(id, price) =>
//             this.addProduct(
//               this.props.match.params.productId,
//               this.state.quantity,
//               product.price
//             )
//           }
//         >
//           Add To Cart
//         </button>
//         <p>{product.description}</p>
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     product: state.singleProduct,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadProduct: (id) => dispatch(fetchSingleProduct(id)),
//     createCart: (body) => dispatch(addOrderItem(body)),
//   };
// };

// export default connect(mapState, mapDispatch)(SingleProduct);
