import React, { useEffect } from "react";
import "./Card.scss";
import { Link, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../redux/wishlistReducer";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firestore";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [favor, setFavor] = useState(false);
  const user = useSelector((state) => state.auth.userInfo);

  const handleWishlist = () => {
    if (user.length > 0) {
      dispatch(
        addToWishlist({
          id: item.id,
          title: item.attributes.title,
          img: item.attributes.img.data.attributes.url,
          img2: item.attributes.img2.data.attributes.url,
          isNew: item.attributes.isNew,
          price: item.attributes.price,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
      var unsub = async () => {
        await setDoc(doc(db, "wishlists", user[0].uid), { wishlist });
      };
    if(user.length > 0) unsub();
  }, [dispatch, wishlist,user]);

  useEffect(() => {
    const favourited = wishlist?.find((i) => i.id === item.id);
    if (favourited) {
      setFavor(true);
    } else {
      setFavor(false);
    }
  }, [dispatch, item.id, wishlist]);

  return (
    <div className="card">
      <div className="image">
        {item?.attributes.isNew && <span>Newly Added</span>}
        <img
          src={
            process.env.REACT_APP_UPLOAD_URL +
            item.attributes.img.data.attributes.url
          }
          alt="mainImg"
          className="mainImg"
        />
        <img
          src={
            process.env.REACT_APP_UPLOAD_URL +
            item.attributes.img2.data.attributes.url
          }
          alt="secondImg"
          className="secondImg"
        />
        <Link className="link" to={`/product/${item.id}`}>
          <div id="view">View</div>
        </Link>
        {
          <FavoriteBorderIcon
            id={favor ? "favourite" : "notFavor"}
            onClick={handleWishlist}
          />
        }
      </div>
      <h2>{item?.attributes.title}</h2>
      <div className="prices">
        <h3>₹{item.attributes.oldPrice}</h3>
        <h3>₹{item?.attributes.price}</h3>
        <h3>({Math.ceil((item.attributes.price/item.attributes.oldPrice)*100)})% OFF</h3>
      </div>
    </div>
  );
};

export default Card;
