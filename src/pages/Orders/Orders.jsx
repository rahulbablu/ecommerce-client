import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

import { db } from "../../firestore";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import "./Orders.scss";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((s) => s.auth.userInfo);

  useEffect(() => {
    const unsub = async () => {
      const docRef = doc(db, "orders", user[0].uid);
      const docSnap = await getDoc(docRef);
      setOrders(docSnap.data().products);
    };

    if(user.length > 0) unsub();
  }, [user]);

  console.log(orders);

  return (
    <>
      <Navbar />
        <div className="ordered">
          <h1>Orders</h1>
          <div className="orders">
            {orders.length === 0 ? (
              <span id="message">No Orders were made !</span>
            ) : (
              orders.map((item) => (
                <>
                  <div className="card" key={Math.random()}>
                    <div className="image">
                      <img src={item.img} alt="mainImg" className="mainImg" />
                    </div>
                    <div className="info">
                      <h2>{item.title}</h2>
                      <p>{item.desc}</p>
                    </div>
                    <div className="total">
                      <span>
                        <h5>Qty: {item.quantity}</h5>
                        <h5>X</h5>
                        <h5>₹{item.price}</h5>
                      </span>
                      <h4>Total: {item.quantity * item.price}</h4>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      <Footer className='footer' />
    </>
  );
};

export default Orders;
