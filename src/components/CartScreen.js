import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../_actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  console.log(productId, qty);
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);
  return (
    <div>
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        cartItems.map((item) => (
          <div key={item.image}>
            <img
              src={item.image}
              alt="lkfjdklsfjkl"
              style={{ width: "200px" }}
            />
            Qty:{item.qty}
            <br />
            <Button onClick={() => removeFromCartHandler(item.product)}>
              Delete
            </Button>
          </div>
        ))
      )}
      Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items): ${" "}
      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      <Button disabled={cartItems.length === 0}>Proceed to checkout</Button>
    </div>
  );
}
