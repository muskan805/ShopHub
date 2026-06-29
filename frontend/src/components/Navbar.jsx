import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLocationDot,
  FaMagnifyingGlass,
  FaCartShopping,
} from "react-icons/fa6";

import {
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";


function Navbar() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const cartItems =
    JSON.parse(localStorage.getItem("cartItems")) || [];

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div
        className="nav-logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <h2>ShopHub</h2>
      </div>

      {/* Location */}
      <div className="nav-location">
        <FaLocationDot />
        <div>
          <p className="small-text">
            Delivering to Mumbai
          </p>
          <h4>Update Location</h4>
        </div>
      </div>

      {/* Search */}
      <form
        className="nav-search"
        onSubmit={searchHandler}
      >
        <select>
          <option>All</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <button type="submit">
          <FaMagnifyingGlass />
        </button>
      </form>

      {/* Language */}
      <div className="nav-language">
        🇮🇳 EN
      </div>

      {/* Account */}
      {userInfo ? (
        <div className="nav-account">
          <p className="small-text">
            Hello, {userInfo.name}
          </p>

        <h4
  onClick={() => setShowMenu(!showMenu)}
  style={{ cursor: "pointer" }}
              >
                     My Account{" "}
          <FaChevronDown
              style={{
               fontSize: "12px",
                   }}
               />
           </h4>

          {showMenu && (
            <div className="account-dropdown">

              <div
                className="dropdown-item"
                onClick={() => {
               setShowMenu(false);
                  navigate("/profile");
                }}
              >
                <FaUser />
                My Profile
              </div>

              <div
                className="dropdown-item"
                onClick={() => {
                      setShowMenu(false);
                     navigate("/myorders");
                    }}
              >
                <FaBox />
                My Orders
              </div>

              <div
                className="dropdown-item logout"
                onClick={() => {
                   setShowMenu(false);
                    logoutHandler();
                }}
              >
                <FaSignOutAlt />
                Logout
              </div>

            </div>
          )}
        </div>
      ) : (
        <div
          className="nav-account"
          style={{ cursor: "pointer" }}
        >
          <p
            className="small-text"
            onClick={() =>
              navigate("/login")
            }
          >
            Hello, Sign In
          </p>

          <h4
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </h4>
        </div>
      )}

      {/* Orders */}
      <div
        className="nav-orders"
        onClick={() =>
          navigate("/myorders")
        }
        style={{ cursor: "pointer" }}
      >
        <p className="small-text">
          Returns
        </p>

        <h4>& Orders</h4>
      </div>

      {/* Cart */}
      <div
        className="nav-cart"
        onClick={() =>
          navigate("/cart")
        }
        style={{ cursor: "pointer" }}
      >
        <FaCartShopping />

        <span id="cart-count">
          {cartItems.reduce(
            (acc, item) => acc + item.qty,
            0
          )}
        </span>

        Cart
      </div>
    </nav>
  );
}

export default Navbar;