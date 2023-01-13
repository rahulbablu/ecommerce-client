import React from "react";
import "./Cart.scss";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";

import { loadStripe } from "@stripe/stripe-js";
import makeRequest from "../../makeRequest";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firestore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart.products);
  const user = useSelector((s) => s.auth.userInfo);
  
  const totalPrice = () => {
    let total = 0;
    products?.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const stripePromise = loadStripe(
    "pk_test_51MI7PYSIDDAfK43V95V2CUaeeVcUhN4u8lQdaEHoO92AIu8Bxmhqd2U3itIPrxLJB9sbPI2G8UwefmeIvmkjCpiy00XQSNAcdX"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {
        products,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const payment = async () => {
    if (user.length > 0) {
      const userRef = doc(db, "orders", user[0].uid);
      await setDoc(userRef, { products }, { merge: true });
      handlePayment();
    }else{
      navigate('/login')
    }
  };

  return (
    <div className="cart">
      <h2>Products in your cart</h2>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h3>{item.title}</h3>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ₹{item.price}
            </div>
          </div>
          <DeleteOutlineIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>₹{totalPrice()}</span>
      </div>
      <button onClick={payment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
