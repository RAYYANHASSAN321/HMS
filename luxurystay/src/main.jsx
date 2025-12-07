import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import App from "./App.jsx";
import MyNavbar from "./MyNavbar.jsx";
import Rooms from "./Rooms.jsx";
import About from "./About.jsx";
import Gallery from "./gallery.jsx";
import Blog from "./blog.jsx";
import Blogsingle from "./Blogsingle.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
  return (
    <>
    <MyNavbar />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-single" element={<Blogsingle />} />
        <Route path="/contact" element={<Contact />} />

        
      </Routes>
       <Footer />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </StrictMode>
);
