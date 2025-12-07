import React from "react";
import { Link} from "react-router";

const MyNavbar = () => {

  return (
    <>
      <header className="header_area">
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            {/* Brand */}
            <a className="navbar-brand logo_h" href="/home">
              <img src="image/main-logo.png" alt="logo" width={100} height={80} />
            </a>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

            {/* Menu */}
            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/rooms">Rooms</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
                <li className="nav-item submenu dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                    Blog
                  </a>
                  <ul className="dropdown-menu">
                    <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/blog-single">Blog Details</Link></li>
                  </ul>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default MyNavbar;
