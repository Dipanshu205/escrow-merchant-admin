import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings";
import MerchantAuth from "./components/MerchantAuth";
import ModernAuth from "./components/ModernAuth";
import OtpVerification from "./components/OtpVerification";

const DashboardLayout = ({ children }) => (
  <div className="flex bg-slate-900 text-white min-h-screen font-inter">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6 flex-1 overflow-y-auto">{children}</main>
    </div>
  </div>
);

function App() {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        {/* Auth Pages (No Sidebar / Navbar) */}
        {/* <Route path="/auth" element={<MerchantAuth />} /> */}



          <Route
          path="/auth"
          element={
              <ModernAuth />
          }
        />

        <Route
          path="/verification"
          element={
              <OtpVerification />
          }
        />






        {/* Dashboard Pages (With Sidebar / Navbar) */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <DashboardLayout>
              <Orders />
            </DashboardLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
    </>
  );
}

export default App;
