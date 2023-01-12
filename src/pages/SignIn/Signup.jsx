import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/AuthSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.scss";
import { auth, db } from "../../firestore";
import { doc, setDoc } from "firebase/firestore";
import shopping from "../../assets/imgs/shopping.svg";
import { resetWishlist } from "../../redux/wishlistReducer";

const Signup = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const user = [{uid: res.user.uid,
        displayName: username,
        email,}]

      await setDoc(doc(db, "users", res.user.uid), {user});

      await setDoc(doc(db, "wishlists", res.user.uid), { wishlist: {} });

      await setDoc(doc(db, "orders", res.user.uid), {});

      dispatch(
        setUser(user)
      );

      dispatch(resetWishlist());

      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <img src={shopping} alt="shopping" />
      <div className="formWrapper">
        <span className="logo">Chowrasta</span>
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name="Name" />
          <input type="email" placeholder="Email" name="Email" />
          <input type="password" placeholder="Password" name="Password" />
          <button type="submit">Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
