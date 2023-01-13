import React, { useEffect, useState } from "react";
import "./Product.scss";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { addToWishlist } from "../../redux/wishlistReducer";
import { db } from "../../firestore";
import { doc, setDoc } from "firebase/firestore";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const { data, loading } = useFetch(`/products/${id}?populate=*`);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const [favor, setFavor] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userInfo);

  const handleWishlist = () => {
    if (user.length > 0) {
      dispatch(
        addToWishlist({
          id: data.id,
          title: data.attributes.title,
          img: data.attributes.img.data.attributes.url,
          img2: data.attributes.img2.data.attributes.url,
          isNew: data.attributes.isNew,
          price: data.attributes.price,
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
    if (user.length > 0) unsub();
  }, [dispatch, wishlist, user.uid, user]);

  useEffect(() => {
    const favourited = wishlist.find((i) => i.id === +id);

    if (favourited) {
      setFavor(true);
    } else {
      setFavor(false);
    }
  }, [dispatch, id, wishlist]);

  return (
    <>
      <Navbar />
      <div className="product">
        {loading ? (
          "Loading"
        ) : (
          <div className="left">
            <div className="images">
              <img
                src={data?.attributes?.img?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={data?.attributes?.img2?.data?.attributes?.url}
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={data?.attributes?.[selectedImg].data?.attributes?.url}
                alt=""
              />
            </div>
          </div>
        )}
        <div className="right">
          <h3>{data?.attributes.title}</h3>
          <span className="price">₹{data?.attributes.price}</span>
          <p>{data?.attributes.desc}</p>
          <div className="quantity">
            <button
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              -
            </button>
            {quantity}
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>
          <button
            className="add"
            onClick={() =>
              dispatch(
                addToCart({
                  id: data.id,
                  title: data.attributes.title,
                  price: data.attributes.price,
                  desc: data.attributes.desc,
                  img: data.attributes.img.data.attributes.url,
                  quantity,
                })
              )
            }
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>
          <div
            className={favor ? "wishlistColor" : "wishlist"}
            onClick={() => handleWishlist()}
          >
            <FavoriteBorderIcon />
            <span>{favor ? "SAVED TO WISHLIST" : "SAVE TO WISHLIST"}</span>
          </div>
          <div className="info">
            <h4>Product Details</h4>
            <h5>{data?.attributes.title}</h5>
            <ul>
              <li>{data?.attributes.desc}</li>
              <li>Regular Fit</li>
              <li>Package contains : 1 item</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
