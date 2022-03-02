import axios from "axios";

//action type constants
const GET_SINGLE_PRODUCT = "GET_SINGLE_PRODUCT";

//Action creators
const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product,
});

//Thunks
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(getSingleProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

//Reducer
export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
