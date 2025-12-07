import React from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/logout", {}, { withCredentials: true });
      localStorage.removeItem("user");
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav
      className="sidebar sidebar-offcanvas"
      id="sidebar"
      style={{
        background: "#fff",
        boxShadow: "3px 0 15px rgba(124, 77, 255, 0.1)",
        borderRight: "1px solid #eee",
        paddingTop: "20px",
      }}
    >
      <ul className="nav">
        {/* === Dashboard === */}
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-device-desktop menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Dashboard</span>
          </NavLink>
        </li>
  {/* === Analytics === */}
        <li className="nav-item">
          <NavLink
            to="/analytics"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-home menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Analyatics</span>
          </NavLink>
        </li>

        {/* === Users === */}
        <li className="nav-item">
          <NavLink
            to="/index"
            end
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-user-add menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">User</span>
          </NavLink>
        </li>

        {/* === Roles === */}
        <li className="nav-item">
          <NavLink
            to="/role"
            end
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-user-add menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Roles</span>
          </NavLink>
        </li>

        {/* === Rooms === */}
        <li className="nav-item">
          <NavLink
            to="/rooms"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-home menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Rooms</span>
          </NavLink>
        </li>

        {/* === Manager === */}
        <li className="nav-item">
          <NavLink
            to="/manager"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-home menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Manager</span>
          </NavLink>
        </li>

         {/* === Reservation === */}
        <li className="nav-item">
          <NavLink
            to="/reserve"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-home menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Reservation</span>
          </NavLink>
        </li>

        {/* === House keeper === */}
        <li className="nav-item">
          <NavLink
            to="/hs"
            className="nav-link"
            style={({ isActive }) => ({
              background: isActive ? "#7B3FE4" : "transparent",
              color: isActive ? "#fff" : "#7B3FE4",
              borderRadius: "10px",
              fontWeight: 500,
              margin: "5px 10px",
              transition: "0.3s",
            })}
          >
            <i
              className="typcn typcn-home menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title"> Cleaning Staff </span>
          </NavLink>
        </li>

        {/* === Logout === */}
        <li className="nav-item mt-4">
          <button
            onClick={handleLogout}
            className="nav-link btn btn-link text-start p-0 w-100"
            style={{
              textDecoration: "none",
              color: "#7B3FE4",
              fontWeight: 600,
              margin: "5px 10px",
              background: "#f4eaff",
              borderRadius: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#7B3FE4";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#f4eaff";
              e.currentTarget.style.color = "#7B3FE4";
            }}
          >
            <i
              className="typcn typcn-arrow-back-outline menu-icon"
              style={{ fontSize: "18px", marginRight: "6px" }}
            />
            <span className="menu-title">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
