import { useEffect, useState } from "react";
import api from "../services/api";

type Item = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url: string;
  category?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onItemUpdated: () => void;
  item: Item | null;
};

export default function EditItemModal({
  isOpen,
  onClose,
  onItemUpdated,
  item,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill when item changes
  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
      setDescription(item.description || "");
      setImageUrl(item.image_url);
      setCategory(item.category || "");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async () => {
    if (!name || !price || !imageUrl) {
      alert("Name, price and image are required");
      return;
    }

    try {
      setLoading(true);

      const payload: any = {
        name,
        price: parseFloat(price),
        description,
        image_url: imageUrl,
      };

      if (category.trim()) {
        payload.category = category.trim();
      } else {
        payload.category = null;
      }

      await api.put(`/items/${item.id}`, payload);

      onItemUpdated();
      onClose();
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Edit Menu Item
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="e.g. Classic Burger"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (R) *</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="e.g. Mains, Drinks"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none h-24"
              placeholder="Briefly describe the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button 
            onClick={onClose} 
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
