import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col items-center mt-12">
        <h1 className="text-xl font-semibold mb-8">Admin Dashboard</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/menu-management")}
            className="w-48 bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600"
          >
            Manage Menu
          </button> <br />

          <button
            onClick={() => navigate("/orders")}
            className="w-48 bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
