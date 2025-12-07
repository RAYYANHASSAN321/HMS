import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/currentUser", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (e) {
        console.log("Not logged in");
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <nav
      className="navbar fixed-top d-flex align-items-center justify-content-between px-4 shadow-sm"
      style={{
        backgroundColor: "#fff", // solid white
        borderBottom: "3px solid #6a0dad", // royal purple line
        height: "75px",
        zIndex: 1000,
      }}
    >
      {/* Logo Section */}
      <div className="d-flex align-items-center">
        <a href="#" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{
              height: "50px",
              width: "auto",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              color: "#6a0dad",
              fontWeight: "700",
              fontSize: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            HMS Dashboard
          </span>
        </a>
      </div>

      {/* User Info Section */}
      <div className="d-flex align-items-center">
        {user?.name ? (
          <div
            className="d-flex align-items-center"
            style={{
              color: "#6a0dad",
              fontWeight: "600",
              borderLeft: "2px solid #6a0dad",
              paddingLeft: "15px",
            }}
          >
            <span style={{ marginRight: "10px", fontSize: "1rem" }}>
              {user.name}
            </span>
            <span
              style={{
                backgroundColor: "#f2e5ff",
                padding: "5px 12px",
                borderRadius: "20px",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              {user.role}
            </span>
          </div>
        ) : (
          <span style={{ color: "#999" }}>Guest</span>
        )}
      </div>
    </nav>
  );
};

export default Header;
