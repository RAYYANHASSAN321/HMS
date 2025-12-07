import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";

const Register = () => {
  const [username, setName] = useState("");
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [roles, setRole] = useState("");
  const [roleList, setRoleList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/roles");
      setRoleList(res.data);
    } catch (e) {
      console.error("Error fetching roles:", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("useremail", useremail);
    formData.append("password", password);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("roles", roles);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:8000/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");
      navigate("/login");

      setName("");
      setEmail("");
      setPassword("");
      setContact("");
      setAddress("");
      setImage(null);
      setRole("");
    } catch (e) {
      console.error("Registration failed:", e);
      alert("Registration failed! Please try again.");
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
          width: "450px",
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
          Create Account
        </h2>
        <p style={{ color: "#777", marginBottom: "25px" }}>
          Join us and start your journey today
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 text-start">
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setName(e.target.value)}
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
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={useremail}
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
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Contact</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
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
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
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

          <div className="form-group mb-3 text-start">
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Select Role</label>
            <select
              className="form-select"
              value={roles}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                border: "1.5px solid #d9c4f0",
                borderRadius: "8px",
                padding: "10px 12px",
                color: "#333",
                backgroundColor: "#faf9ff",
              }}
            >
              <option value="">-- Select Role --</option>
              {roleList.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-4 text-start">
            <label style={{ color: "#6a0dad", fontWeight: "500" }}>Profile Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{
                border: "1.5px solid #d9c4f0",
                borderRadius: "8px",
                padding: "10px 12px",
                backgroundColor: "#faf9ff",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
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
            onMouseOver={(e) => (e.target.style.background = "#8e3efc")}
            onMouseOut={(e) => (e.target.style.background = "#6a0dad")}
          >
            Register
          </button>
        </form>

        <p className="mt-4" style={{ color: "#555" }}>
          Already have an account?{" "}
          <NavLink
            to="/login"
            style={{
              color: "#6a0dad",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
