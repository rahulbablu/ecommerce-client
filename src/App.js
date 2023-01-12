import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import "./app.scss";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wishlist from "./pages/Wishlist/Wishlist";
import Signup from "./pages/SignIn/Signup";
import Orders from "./pages/Orders/Orders";

function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
