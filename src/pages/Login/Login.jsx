import React, { useState } from "react";
import "./Login.scss";
import shopping from "../../assets/imgs/shopping.svg";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firestore";
import { doc, getDoc } from "firebase/firestore";
import { resetWishlist, setWishlist } from "../../redux/wishlistReducer";

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);

      const wishRef = doc(db, "wishlists", res.user.uid);
      const wishSnap = await getDoc(wishRef);
      dispatch(resetWishlist());
      dispatch(setWishlist(wishSnap.data().wishlist));

      dispatch(
        setUser([
          {
            uid: docSnap.data().user[0].uid,
            displayName: docSnap.data().user[0].displayName,
            email: docSnap.data().user[0].email,
          },
        ])
      );
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
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          {err ? (
            <button
              onClick={() => navigate("/signup")}
              style={{ backgroundColor: "red" }}
            >
              No Acc. Found
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
        <p>
          You don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
