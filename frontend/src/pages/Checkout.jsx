import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaMailBulk,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash On Delivery");

  const cartItems =
    JSON.parse(localStorage.getItem("cartItems")) || [];

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = 0;

  const gst = Math.round(itemsPrice * 0.18);

  const totalPrice =
    itemsPrice + shippingPrice + gst;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const shippingAddress = {
        address,
        city,
        postalCode,
        country,
      };

      await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.removeItem("cartItems");

      alert("Order Placed Successfully!");

      navigate("/myorders");
    } catch (error) {
      console.log(error);
      alert("Unable to place order.");
    }
  };

  return (
    <div className="checkout-container">

      {/* LEFT */}

      <div className="checkout-left">

        <h1>Checkout</h1>

        <form onSubmit={submitHandler}>

          <div className="form-card">

            <h2>Shipping Address</h2>

            <div className="input-box">

              <FaMapMarkerAlt className="icon"/>

              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e)=>
                  setAddress(e.target.value)
                }
                required
              />

            </div>

            <div className="input-box">

              <FaCity className="icon"/>

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e)=>
                  setCity(e.target.value)
                }
                required
              />

            </div>

            <div className="input-box">

              <FaMailBulk className="icon"/>

              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e)=>
                  setPostalCode(e.target.value)
                }
                required
              />

            </div>

            <div className="input-box">

              <FaGlobe className="icon"/>

              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e)=>
                  setCountry(e.target.value)
                }
                required
              />

            </div>

          </div>

          <div className="form-card">

            <h2>Payment Method</h2>

            <label className="payment-option">

              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "Cash On Delivery"
                }
                onChange={()=>
                  setPaymentMethod(
                    "Cash On Delivery"
                  )
                }
              />

              <FaMoneyBillWave />

              Cash On Delivery

            </label>

            <label className="payment-option">

              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "Card"
                }
                onChange={()=>
                  setPaymentMethod("Card")
                }
              />

              <FaCreditCard />

              Credit / Debit Card

            </label>
                    </div>

        <button
          type="submit"
          className="place-order-btn"
        >
          Place Order
        </button>

      </form>

    </div>

    {/* RIGHT */}

    <div className="checkout-right">

      <div className="summary-card">

        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Items</span>
          <span>
            {cartItems.reduce(
              (acc, item) => acc + item.qty,
              0
            )}
          </span>
        </div>

        <div className="summary-row">
          <span>Subtotal</span>

          <span>
            ₹{itemsPrice.toLocaleString()}
          </span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>

          <span className="free">
            FREE
          </span>
        </div>

        <div className="summary-row">
          <span>GST (18%)</span>

          <span>
            ₹{gst.toLocaleString()}
          </span>
        </div>

        <hr />

        <div className="summary-total">

          <span>Grand Total</span>

          <span>
            ₹{totalPrice.toLocaleString()}
          </span>

        </div>

        <div className="secure-payment">

          🔒 Secure Checkout

        </div>

      </div>

    </div>

  </div>
);
}

export default Checkout;