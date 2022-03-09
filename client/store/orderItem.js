import Axios from "axios";

const ADD_PRODUCTS = "ADD_PRODUCTS";
const GUEST_USER = "GUEST_USER";

export const addProducts = (order) => {
  return {
    type: ADD_PRODUCTS,
    order,
  };
};

export const guestUserItem = (item) => {
  return {
    type: GUEST_USER,
    item,
  };
};

export const addOrderItem = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      //console.log(token);
      if (token) {
        const { data } = await Axios.put("/api/orders", product, {
          headers: {
            authorization: token,
          },
        });
        dispatch(addProducts(data));
      }
      // else {
      //   window.localStorage.setItem(
      //     "HELLO",
      //     JSON.stringify(["VINH ", "sfsdfdsg"])
      //   );
      // }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addGuestOrderItem = (product) => {
  return async (dispatch) => {
    try {
      window.localStorage.setItem("orders", JSON.stringify(product));
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchGuestCartItem = () => {
  return async (dispatch) => {
    try {
      const data = JSON.parse(window.localStorage.getItem("orders")) || [];
      dispatch(guestUserItem(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function orderItemReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return action.order;
    case GUEST_USER:
      return action.item;
    default:
      return state;
  }
}
