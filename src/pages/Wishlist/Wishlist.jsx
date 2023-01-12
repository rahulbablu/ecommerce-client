import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Wishlist.scss";

import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { removeFromWishlist, resetWishlist, setWishlist } from "../../redux/wishlistReducer";
import { db } from "../../firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Wishlist = () => {
  
  const user = useSelector((s) => s.auth.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = async () => {
      const docRef = doc(db, "wishlists", user[0].uid);
      const docSnap = await getDoc(docRef);
      dispatch(resetWishlist())
      dispatch(setWishlist(docSnap.data().wishlist))
    };

    if(user.length > 0) unsub();
  }, [dispatch, user]);

  const handleRemove = (item) => {
    dispatch(removeFromWishlist(item.id));
  };
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  useEffect(() => {
    const unsub = async () => {
      await setDoc(doc(db, "wishlists", user[0].uid), { wishlist });
    };
    if(user.length > 0) unsub();
  }, [dispatch, wishlist, user]);

  return (
    <>
      <Navbar />
      <div className="products">
        <div className="right">
          <h1>Favourite Products</h1>
          <div className="wishlist">
            {wishlist.length === 0 ? (
              <span id="message">No Favourite items added !</span>
            ) : (
              wishlist.map((item) => (
                <>
                  <div className="card" key={item.id}>
                    <div className="image">
                      {item.isNew && <span>Newly Added</span>}
                      <img src={item.img} alt="mainImg" className="mainImg" />
                      <img
                        src={item.img2}
                        alt="secondImg"
                        className="secondImg"
                      />
                      <Link className="link" to={`/product/${item.id}`}>
                        <div id="view">View</div>
                      </Link>
                      <DisabledByDefaultIcon
                        id="remove"
                        onClick={() => handleRemove(item)}
                      />
                    </div>
                    <h2>{item.title}</h2>
                    <div className="prices">
                      <h3>₹{item.oldPrice || item.price + 179}</h3>
                      <h3>₹{item.price}</h3>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
