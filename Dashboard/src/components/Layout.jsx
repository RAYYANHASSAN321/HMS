import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../assets/vendors/css/vendor.bundle.base.css";
import "../assets/vendors/typicons/typicons.css";
import "../assets/css/vertical-layout-light/style.css";

const Layout = () => {
  return (
    <div className="container-scroller">
      {/* Header */}
      <Header />

      {/* Main page layout wrapper */}
      <div className="container-fluid page-body-wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-panel">
          <div className="content-wrapper">
            <Outlet />
          </div>

          {/* Footer */}
          <footer className="footer mt-4">
  <div className="card border-0 shadow-sm">
    <div className="card-body text-center py-3">
      <span
        className="fw-semibold"
        style={{ color: "#6A0DAD", fontSize: "15px" }}
      >
        © 2025 <span style={{ color: "#000" }}>HotelManagement</span>. All rights reserved.
      </span>
    </div>
  </div>
</footer>

        </div>
      </div>
    </div>
  );
};

export default Layout;
