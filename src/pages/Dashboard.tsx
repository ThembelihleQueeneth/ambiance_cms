import React from "react";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col items-center mt-12">
        <h1 className="text-xl font-semibold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="space-y-4">
          <button className="w-48 bg-orange-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-orange-600 transition">
            Manage Menu
          </button>

          <button className="w-48 bg-orange-500 text-white py-3 rounded-lg font-medium shadow-md hover:bg-orange-600 transition">
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
