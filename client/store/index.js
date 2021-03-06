import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import orderReducer from "./orders";
import cartReducer from "./cart";
import orderItemReducer from "./orderItem";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  singleProduct: singleProductReducer,
  orders: orderReducer,
  cart: cartReducer,
  guest: orderItemReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
