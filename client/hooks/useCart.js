import { useSelector, useDispatch } from 'react-redux';
import { addOrderItem, updateQuantity } from '../store/orderItem';

export const useCart = () => {
  const newOrder = useSelector((state) => state.orders.newOrder);
  const dispatch = useDispatch();

  const isProductExists = (id) => {
    let isExisted = false;
    let existedProduct = {};

    if (newOrder.length === 0 || newOrder === undefined) {
      return { isExisted, existedProduct };
    }
    const checkId = newOrder[0].products.map((product) => {
      console.log(`product id: ${product.id}, id: ${id}`);
      if (product.id.toString() === id.toString()) {
        isExisted = true;
        existedProduct = {
          orderId: newOrder[0].id,
          productId: product.id,
          quantity: product.orderItem.quantity,
          salesPrice: product.orderItem.salesPrice,
        };
        return {
          isExisted,
          existedProduct,
        };
      }
    });

    // to cover edge case when the cart starts empty
    if (checkId[0] === undefined) {
      return { isExisted, existedProduct };
    } else {
      return checkId[0];
    }
  };

  const addToCart = (id, quantity, salesPrice) => {
    const { isExisted, existedProduct } = isProductExists(id);
    console.log(`existed product qty is ${existedProduct.quantity}`);
    console.log(`new quantity is ${existedProduct.quantity} + ${quantity}`);
    if (isExisted) {
      dispatch(
        updateQuantity({
          orderId: existedProduct.orderId,
          productId: existedProduct.productId,
          quantity: existedProduct.quantity * 1 + quantity * 1,
          salesPrice,
        })
      );
    } else {
      dispatch(addOrderItem({ id, quantity, salesPrice }));
    }
  };

  return {
    cart: newOrder,
    addToCart,
  };
};
