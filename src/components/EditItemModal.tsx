import { useEffect, useState } from "react";
import api from "../services/api";

type Item = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url: string;
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
  const [loading, setLoading] = useState(false);

  // Prefill when item changes
  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
      setDescription(item.description || "");
      setImageUrl(item.image_url);
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

      await api.put(`/items/${item.id}`, {
        name,
        price,
        description,
        image_url: imageUrl,
      });

      onItemUpdated();
      onClose();
    } catch (error) {
      alert("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Edit Menu Item
        </h2>

        <input
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="w-full mb-3 px-4 py-2 border rounded-lg"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
