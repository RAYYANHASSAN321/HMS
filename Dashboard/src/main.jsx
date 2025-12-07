import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import AuthRoutes from "./Authroutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthRoutes />
    <App />
  </BrowserRouter>
);
