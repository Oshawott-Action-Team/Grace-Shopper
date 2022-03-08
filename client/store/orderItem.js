import Axios from 'axios';

const ADD_PRODUCTS = 'ADD_PRODUCTS';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const addProducts = (order) => {
  return {
    type: ADD_PRODUCTS,
    order,
  };
};

export const _updateQuantity = (order) => {
  return {
    type: UPDATE_QUANTITY,
    order,
  };
};

export const addOrderItem = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      //console.log(token);
      if (token) {
        const { data } = await Axios.put('/api/orders', product, {
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

export const updateQuantity = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await Axios.put('/api/orders/product', product, {
          headers: {
            authorization: token,
          },
        });
        dispatch(_updateQuantity(data));
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
    case UPDATE_QUANTITY:
      return action.order;
    default:
      return state;
  }
}
