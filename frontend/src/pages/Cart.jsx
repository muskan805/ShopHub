import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
} from "react-icons/fa";

import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.product === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.product === id
        ? {
            ...item,
            qty:
              item.qty > 1
                ? item.qty - 1
                : 1,
          }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCartHandler = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.product !== id
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.qty,
    0
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">

        <FaShoppingCart className="empty-icon" />

        <h1>Your Cart is Empty</h1>

        <p>
          Looks like you haven't added
          anything yet.
        </p>

        <Link to="/">
          <button className="shop-btn">
            Continue Shopping
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-container">

      <div className="cart-left">

        <h1>Shopping Cart</h1>

        {cartItems.map((item) => (
          <div
            className="cart-item"
            key={item.product}
          >

            <img
              src={item.image}
              alt={item.name}
            />

             <div className="cart-info">

  <h2>{item.name}</h2>
  <div className="rating">
    ⭐⭐⭐⭐⭐
    <span>
        {item.rating} ({item.numReviews} Reviews)
    </span>
</div>

  <p className="brand">
    Brand : {item.brand}
  </p>

  <p className="category">
    Category : {item.category}
  </p>
  <p className="stock">
    ✔ In Stock
</p>

  <p className="price">
  Price :
  <span>
    ₹{item.price.toLocaleString()}
  </span>
</p>

<p className="item-total">
  Total :
  <span>
    ₹{(item.price * item.qty).toLocaleString()}
  </span>
</p>
               <div className="qty-box">

    <span className="qty-text">
        Qty
    </span>

    <button
      onClick={() =>
        decreaseQty(item.product)
      }
    >
      <FaMinus />
    </button>

    <span className="qty-number">
        {item.qty}
    </span>

    <button
      onClick={() =>
        increaseQty(item.product)
      }
    >
      <FaPlus />
    </button>

</div>
              <button
                className="remove-btn"
                onClick={() =>
                  removeFromCartHandler(
                    item.product
                  )
                }
              >
                <FaTrash /> Remove
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="cart-right">

        <div className="summary-card">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹
              {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free">
             FREE
               </span>
          </div>

          <hr />

          <div className="summary-total">

            <span>Total</span>

            <span>
              ₹
              {totalPrice.toLocaleString()}
            </span>

          </div>

          <button
            className="checkout-btn"
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
         <Link
          to="/"
        className="continue-link">
        <button className="continue-btn">
            Continue Shopping
           </button>
             </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;