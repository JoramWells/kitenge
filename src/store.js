import thunk from "redux-thunk";
import {
  categoryListReducer,
  categoryListsReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productSaveReducer,
  productUpdateReducer,
} from "./_reducers/productListReducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./_reducers/userReducers";
import Cookie from "js-cookie";
import { cartReducer } from "./_reducers/cartReducers";

const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = { userSignin: { userInfo } };

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  cart: cartReducer,
  categoryList: categoryListReducer,
  categoryLists: categoryListsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
