import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaRupeeSign,
  FaShoppingBag,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "../styles/MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.get(
          "/api/orders/myorders",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (orders.length === 0) {
    return (
      <div className="empty-orders">

        <FaBoxOpen className="empty-icon" />

        <h1>No Orders Yet</h1>

        <p>
          You haven't placed any orders.
        </p>

      </div>
    );
  }

  return (
    <div className="orders-container">

      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.map((order) => (

        <div
          className="order-card"
          key={order._id}
        >

          <div className="order-header">

            <div>

              <h2>
                <FaBoxOpen />
                Order
              </h2>

              <p className="order-id">
                {order._id}
              </p>

            </div>

            <div
              className={
                order.isDelivered
                  ? "status delivered"
                  : "status pending"
              }
            >
              {order.isDelivered ? (
                <>
                  <FaCheckCircle />
                  Delivered
                </>
              ) : (
                <>
                  <FaClock />
                  Processing
                </>
              )}
            </div>

          </div>

          <div className="order-details">

            <div>

              <FaCalendarAlt />

              <span>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

            <div>

              <FaShoppingBag />

              <span>
                {order.orderItems.length}
                {" "}Items
              </span>

            </div>

            <div>

              <FaRupeeSign />

              <span>
                {order.totalPrice.toLocaleString()}
              </span>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default MyOrders;