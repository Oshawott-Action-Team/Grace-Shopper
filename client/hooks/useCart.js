import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNewOrder, updateProduct } from "../store/cart";
import {
  addGuestOrderItem,
  addOrderItem,
  fetchGuestCartItem,
} from "../store/orderItem";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const newOrder = useSelector((state) => state.cart);
  const guestItem = useSelector((state) => state.guest);
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchNewOrder());
    } else {
      dispatch(fetchGuestCartItem());
    }
  }, [isLoggedIn]);

  const isProductExists = (id) => {
    let isExisted = false;
    let existedProduct = {};

    if (newOrder.length === 0 || newOrder === undefined) {
      return { isExisted, existedProduct };
    }
    const checkId = newOrder[0].products.map((product) => {
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
    if (isExisted) {
      dispatch(
        updateProduct({
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

  const addToGuestCart = (id, productName, imageUrl, quantity, salesPrice) => {
    guestItem.push({ id, productName, imageUrl, quantity, salesPrice });
    dispatch(addGuestOrderItem(guestItem));
  };

  const getCartQuantity = () => {
    let cartQuantity = 0;
    if (newOrder[0] === undefined) {
      return cartQuantity;
    } else {
      return (cartQuantity = newOrder[0].products.reduce(
        (acc, product) => (acc += product.orderItem.quantity),
        0
      ));
    }
  };

  return {
    getCartQuantity,
    cart: newOrder,
    guestItem,
    addToCart,
    addToGuestCart,
  };
};
