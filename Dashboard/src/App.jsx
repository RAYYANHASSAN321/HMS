import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import Rooms from "./pages/Rooms";
import Receptionist from "./pages/Receptionist";
import Analytics from "./pages/Anylatics";
import Manager from "./pages/Manager";
import HouseKeeping from "./pages/HouseKeeping";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/index" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/role" element={<Roles />} />
        <Route path="/reserve" element={<Receptionist />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/hs" element={<HouseKeeping />} />


        
      </Route>
    </Routes>
  );
};

export default App;
