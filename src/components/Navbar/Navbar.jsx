import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { signOut } from "firebase/auth";
import { auth } from "../../firestore";
import { useEffect } from "react";
import {setUser} from '../../redux/AuthSlice'

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { resetWishlist } from "../../redux/wishlistReducer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobile, setMobile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.innerWidth < 900) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  const products = useSelector((state) => state.cart.products);

  const totalQuantity = () => {
    let total = 0;
    products?.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth);
    dispatch(setUser([]))
    dispatch(resetWishlist());
  }

  const activeUser = useSelector((state) => state.auth.userInfo);

  return (
    <div className="navbar">
      {mobile ? (
        <div className="wrapper">
          <div className="left">
            <MenuIcon onClick={() => setOpenMenu(true)} />
            <div className="logoItem">
              <Link className="link logo" to="/">
                CHOWRASTA
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="icons">
              <SearchIcon onClick={() => setOpenSearch(true)} />
              <div onClick={() => setOpen(!open)} className="cartIcon">
                <ShoppingCartOutlinedIcon />
                <span>{totalQuantity()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="left">
            <div className="logoItem">
              <Link className="link logo" to="/">
                CHOWRASTA
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/1">
                Men
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/2">
                Women
              </Link>
            </div>
            <div className="item">
              <Link className="link" to="/products/7">
                Children
              </Link>
            </div>
          </div>
          <div className="center">
            <span className="inputBox">
              <SearchIcon className="icon" />
              <input
                type="text"
                value={searchValue}
                placeholder="Search Products.."
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </span>
          </div>
          <div className="right">
            <div className="icons">
              <PermIdentityIcon
                src=""
                alt=""
                onClick={() => setOpen2(!open2)}
              />
              <div onClick={() => setOpen(!open)} className="cartIcon">
                <ShoppingCartOutlinedIcon />
                <span>{totalQuantity()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {open && <Cart />}
      {searchValue.length > 0 && <Search searchValue={searchValue} />}
      {open2 && (
        <div className="userBox">
          <div className="user">
            {activeUser.length > 0 ? (
              <>
                <h5>{activeUser[0].displayName.toUpperCase()}</h5>
                <Link className="link" to={"/wishlist"}>
                  <p>Wishlist</p>
                </Link>
                <Link className="link" to={"/orders"}>
                  <p>Orders</p>
                </Link>
                <button onClick={handleLogout}>LogOut</button>
              </>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      )}

      {openMenu && (
        <div className="mobileMenu" onMouseLeave={() => setOpenMenu(false)}>
          <div className="menuHead">
            <h4>CHOWRASTA</h4>
            <CloseIcon style={{color: 'red'}} onClick={() => setOpenMenu(false)} />
          </div>
          <div className="userinfo">
            {activeUser.length > 0 ? (
              <>
                <div className="user">
                  <h5>{activeUser[0].displayName.toUpperCase()}</h5>
                  <LogoutIcon
                    style={{ color: "red" }}
                    onClick={handleLogout}
                  />
                </div>
                <Link className="link" to={"/wishlist"}>
                  <p>Wishlist</p>
                </Link>
                <Link className="link" to={"/orders"}>
                  <p>Orders</p>
                </Link>
              </>
            ) : (
              <button onClick={handleLogin}>Login</button>
            )}
          </div>
          <div className="cats">
            <h5>Categories</h5>
            <div className="item">
              <Link
                className="link"
                to="/products/1"
                style={{
                  fontSize: "15px",
                  color: "inherit",
                  borderBottom: "1px solid whitesmoke",
                  display: "flex",
                  flex: "1",
                  padding: "4px",
                }}
              >
                Men
              </Link>
            </div>
            <div className="item">
              <Link
                className="link"
                to="/products/2"
                style={{
                  fontSize: "15px",
                  color: "inherit",
                  borderBottom: "1px solid whitesmoke",
                  display: "flex",
                  flex: "1",
                  padding: "4px",
                }}
              >
                Women
              </Link>
            </div>
            <div className="item">
              <Link
                className="link"
                to="/products/7"
                style={{
                  fontSize: "15px",
                  color: "inherit",
                  borderBottom: "1px solid whitesmoke",
                  display: "flex",
                  flex: "1",
                  padding: "4px",
                }}
              >
                Children
              </Link>
            </div>
          </div>
        </div>
      )}
      {openSearch && (
        <div className="mobileSearch">
          <span className="inputBox">
            <input
              type="text"
              value={searchValue}
              placeholder="Search Products.."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
