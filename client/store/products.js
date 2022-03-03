import Axios from "axios";

const GET_PRODUCTS = "GET_PRODUCTS";

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get("/api/products");
      dispatch(getProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}
