import React from "react";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Add Menu Item
        </h2>

        {/* Item Name */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Item Name
        </label>
        <input
          type="text"
          placeholder="Enter item name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none mb-4"
        />

        {/* Item Price */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Item Price (R)
        </label>
        <input
          type="number"
          placeholder="Enter item price"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none mb-4"
        />

        {/* Item Description */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Item Description
        </label>
        <textarea
          placeholder="Enter item description"
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none mb-4 resize-none"
        />

        {/* Item Image */}
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Item Image
        </label>
        <input
          type="file"
          className="w-full text-sm text-gray-600 mb-6
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:bg-orange-500 file:text-white
            hover:file:bg-orange-600"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}
