import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "/api/users",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("User already exists");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* LEFT */}

        <div className="auth-left">

          <h1>Create Account</h1>

          <p>
            Join ShopHub today and start shopping
            thousands of amazing products.
          </p>

          <div className="shopping-bag">
            <h1>🛍️</h1>
            <h2>ShopHub</h2>
          </div>

          <div className="feature">
            <FaShieldAlt />
            <div>
              <h4>Secure Shopping</h4>
              <p>Your information is protected.</p>
            </div>
          </div>

          <div className="feature">
            <FaTags />
            <div>
              <h4>Exclusive Deals</h4>
              <p>Members receive special discounts.</p>
            </div>
          </div>

          <div className="feature">
            <FaHeadset />
            <div>
              <h4>24/7 Support</h4>
              <p>We're always here to help.</p>
            </div>
          </div>

        </div>

        {/* RIGHT */}

        <div className="auth-right">

          <h2>
            Create <span>ShopHub</span> Account
          </h2>

          <p className="subtitle">
            Fill in your details to get started.
          </p>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>

            <div className="input-box">
              <FaUser className="icon" />

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                className="eye"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>

            <div className="input-box">
              <FaLock className="icon" />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <span
                className="eye"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>

            <button
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="bottom-text">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;