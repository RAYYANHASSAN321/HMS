import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/session", { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) navigate("/index");
      })
      .catch((err) => console.error("Session check failed:", err));
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login successful!");
      navigate("/index");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f8fc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(106, 13, 173, 0.1)",
          padding: "40px 45px",
          textAlign: "center",
        }}
      >
        {/* Logo Section */}
        <div className="text-center mb-3">
          <img
            src="/images/logo.png"
            alt="Hotel Logo"
            style={{
              width: "85px",
              height: "85px",
              objectFit: "contain",
            }}
          />
        </div>

        <h2
          style={{
            color: "#6a0dad",
            fontWeight: "700",
            fontSize: "24px",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h2>
        <p style={{ color: "#777", marginBottom: "25px" }}>
          Sign in to continue your journey
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3 text-start">
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "1.5px solid #d9c4f0",
                borderRadius: "8px",
                padding: "10px 12px",
                color: "#333",
                backgroundColor: "#faf9ff",
              }}
              required
            />
          </div>

          <div className="form-group mb-3 text-start">
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: "1.5px solid #d9c4f0",
                borderRadius: "8px",
                padding: "10px 12px",
                color: "#333",
                backgroundColor: "#faf9ff",
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              background: "#6a0dad",
              border: "none",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "8px",
              padding: "12px 0",
              transition: "0.3s ease",
              fontSize: "16px",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#8e3efc")
            }
            onMouseOut={(e) => (e.target.style.background = "#6a0dad")}
          >
            Login
          </button>
        </form>

        <p className="mt-4" style={{ color: "#555" }}>
          Don’t have an account?
          <NavLink
            to="/register"
            style={{
              color: "#6a0dad",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
