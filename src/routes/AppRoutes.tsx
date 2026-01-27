import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import MenuManagement from "../pages/MenuManagement";
import Orders from "../pages/Orders";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/admin-login" />} />

      {/* Auth */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/menu-management" element={<MenuManagement />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}
