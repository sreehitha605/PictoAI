import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import PurchaseDetails from './pages/PurchaseDetails';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";


import { AppContext } from "./context/AppContext";

const App = () => {
  const { showLogin } = useContext(AppContext);

  return (
    <div
      className="px-4 sm:px-10 md:px-40 lg:px-28 min-h-screen h-auto bg-gradient-to-b from-purple-100 
    via-indigo-100 to-pink-100"
    >
      <ToastContainer postion="bottom-right" />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buycredit" element={<BuyCredit />} />
        <Route path="/purchase-details" element={<PurchaseDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
