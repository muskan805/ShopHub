import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "/api/users/login",
        {
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
      setError("Invalid Email or Password");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LEFT */}

        <div className="auth-left">
          <h1>Welcome Back!</h1>

          <p>
            Login to explore the best deals and
            continue shopping.
          </p>

          <div className="shopping-bag">
  <h1>🛍️</h1>
  <h2>ShopHub</h2>
</div>

          <div className="feature">
            <FaShieldAlt />
            <div>
              <h4>Secure Shopping</h4>
              <p>Your data is always protected.</p>
            </div>
          </div>

          <div className="feature">
            <FaTags />
            <div>
              <h4>Best Prices</h4>
              <p>Get exciting offers every day.</p>
            </div>
          </div>

          <div className="feature">
            <FaHeadset />
            <div>
              <h4>24/7 Support</h4>
              <p>We're here whenever you need.</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="auth-right">
          <h2>
            Login to <span>ShopHub</span>
          </h2>

          <p className="subtitle">
            Enter your details to access your
            account.
          </p>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div className="input-box">
              <FaEnvelope className="icon" />

              <input
                type="email"
                placeholder="Enter Email"
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
                placeholder="Enter Password"
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

            <div className="auth-options">
              <label>
                <input type="checkbox" />
                Remember Me
              </label>

              <span className="forgot">
                Forgot Password?
              </span>
            </div>

            <button
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>
          </form>

          <p className="bottom-text">
            New to ShopHub?

            <Link to="/register">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;