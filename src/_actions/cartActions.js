import axios from "axios";
import Cookie from "js-cookie";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../_constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/product/${productId}`
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.id,
        product_name: data.product_name,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export { addToCart, removeFromCart };
