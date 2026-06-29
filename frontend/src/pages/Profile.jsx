import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo) {
        window.location.href = "/login";
        return;
      }

      try {
        const { data } = await axios.get(
          "/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.put(
        "/api/users/profile",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      setMessage("Profile Updated Successfully!");

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-left">

          <FaUserCircle className="profile-avatar" />

          <h2>{name}</h2>

          <p>{email}</p>

          <div className="profile-info">
            <h4>ShopHub Member</h4>
            <p>
              Manage your account information and
              keep your profile updated.
            </p>
          </div>

        </div>

        <div className="profile-right">

          <h1>My Profile</h1>

          <p className="subtitle">
            Update your account information
          </p>

          {message && (
            <div className="profile-message">
              {message}
            </div>
          )}

          <form onSubmit={submitHandler}>

            <label>Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <label>New Password</label>

            <input
              type="password"
              placeholder="Leave blank if unchanged"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button type="submit">
              Update Profile
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;