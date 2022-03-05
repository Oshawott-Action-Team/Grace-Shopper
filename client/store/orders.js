import Axios from "axios";

const GET_ORDERS = "GET_ORDERS";
const GET_NEW_ORDER = "GET_NEW_ORDER";
const CREATE_ORDER = "CREATE_ORDER";
const COMPLETE_ORDER = "COMPLETE_ORDER";

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

// export const createNewOrder = (product) => {
//   return {
//     type: CREATE_ORDER,
//     product,
//   };
// };

// export const completeOrder = (order) => {
//   return {
//     type: COMPLETE_ORDER,
//     order,
//   };
// };

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");

      if (token) {
        const { data } = await Axios.get("/api/orders/complete", {
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

// export const createNewOrder = (userId, product) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await Axios.post(`/api/orders/users/${userId}`, product);
//       dispatch(createNewOrder(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

// export const completeOrder = (orderId, userId) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await Axios.put(
//         `/api/orders/${orderId}/users/${userId}`
//       );
//       dispatch(completeOrder(data));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

export default function orderReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case GET_NEW_ORDER:
      return action.newOrder;
    // case CREATE_ORDER:
    //   return state;
    // case COMPLETE_ORDER:
    //   return state;

    default:
      return state;
  }
}
