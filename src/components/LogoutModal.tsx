import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
};

export default function LogoutModal({ isOpen, onClose, onLogout }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Confirm Logout
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
