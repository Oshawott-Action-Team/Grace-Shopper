import Axios from "axios";
import { COMPLETE_ORDER } from "./orders";

const GET_NEW_ORDER = "GET_NEW_ORDER";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

const DELETE_ORDERITEM = "DELETE_ORDERITEM";

export const getNewOrder = (newOrder) => {
  return {
    type: GET_NEW_ORDER,
    newOrder,
  };
};

export const updateCartProduct = (order) => {
  return {
    type: UPDATE_PRODUCT,
    order,
  };
};

export const deleteOrderItem = (orderItem) => {
  return {
    type: DELETE_ORDERITEM,
    orderItem,
  };
};
export const fetchNewOrder = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { data } = await Axios.get("/api/orders/new", {
          headers: {
            authorization: token,
          },
        });

        dispatch(getNewOrder(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateProduct = (cartProduct) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await Axios.put(`/api/orders/product`, cartProduct, {
          headers: {
            authorization: token,
          },
        });
        dispatch(updateCartProduct(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteOrderItem = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { data } = await Axios.delete("/api/orders", {
          headers: {
            authorization: token,
          },
          data: productId,
        });

        dispatch(deleteOrderItem(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

const intialState = [];

export default function cartReducer(state = intialState, action) {
  switch (action.type) {
    case GET_NEW_ORDER:
      return action.newOrder;
    case UPDATE_PRODUCT:
      return action.order;
    case DELETE_ORDERITEM:
      return action.orderItem;
    case COMPLETE_ORDER:
      return [];

    //case GUEST_USER
    //return key
    default:
      return state;
  }
}
