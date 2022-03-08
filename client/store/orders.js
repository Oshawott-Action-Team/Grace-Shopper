import Axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';

const COMPLETE_ORDER = 'COMPLETE_ORDER';

export const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

export const completeOrder = (order) => {
  return {
    type: COMPLETE_ORDER,
    order,
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');

      if (token) {
        const { data } = await Axios.get('/api/orders/complete', {
          headers: {
            authorization: token,
          },
        });
        dispatch(getOrders(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const completeNewOrder = (orderId, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await Axios.put(`/api/orders/orderItem`, orderId, {
          headers: {
            authorization: token,
          },
        });
        dispatch(completeOrder(data));

        history.push('/orders');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const intialState = {
  completeOrder: [],
};

export default function orderReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, completeOrder: action.orders };
    case COMPLETE_ORDER:
      state.completeOrder = [...state.completeOrder, action.order];
      return state;
    default:
      return state;
  }
}
