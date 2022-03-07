import Axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
const GET_NEW_ORDER = 'GET_NEW_ORDER';

const COMPLETE_ORDER = 'COMPLETE_ORDER';
const DELETE_ORDERITEM = 'DELETE_ORDERITEM';

export const getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders,
  };
};

export const getNewOrder = (newOrder) => {
  return {
    type: GET_NEW_ORDER,
    newOrder,
  };
};

export const completeOrder = (order) => {
  return {
    type: COMPLETE_ORDER,
    order,
  };
};
export const deleteOrderItem = (orderItem) => {
  return {
    type: DELETE_ORDERITEM,
    orderItem,
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
        //console.log(data);
        dispatch(getOrders(data));
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchNewOrder = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');

      if (token) {
        const { data } = await Axios.get('/api/orders/new', {
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

export const completeNewOrder = (orderId, history) => {
  console.log(orderId);
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await Axios.put(`/api/orders/orderItem`, orderId, {
          headers: {
            authorization: token,
          },
        });
        console.log(data);
        dispatch(completeOrder(data));
        history.push('/orders');
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteOrderItem = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');

      if (token) {
        const { data } = await Axios.delete('/api/orders', {
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

const initialState = { completedOrders: [], newOrder: [] };
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, completedOrders: action.orders };
    case GET_NEW_ORDER:
      return { ...state, newOrder: action.newOrder };
    case COMPLETE_ORDER:
      state.completedOrders = [...state.completedOrders, action.order];
      return state;
    case DELETE_ORDERITEM:
      return { ...state, newOrder: action.orderItem };
    default:
      return state;
  }
}
