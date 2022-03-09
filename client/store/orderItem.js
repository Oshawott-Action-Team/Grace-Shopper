import Axios from "axios";

const ADD_PRODUCTS = "ADD_PRODUCTS";

export const addProducts = (order) => {
  return {
    type: ADD_PRODUCTS,
    order,
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
    } catch (err) {
      console.log(err);
    }
  };
};

export default function orderItemReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PRODUCTS:
      return action.order;
    default:
      return state;
  }
}
