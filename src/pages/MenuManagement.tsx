import { useEffect, useState } from "react";
import Header from "../components/Header";
import AddItemModal from "../components/AddItemModal";
import api from "../services/api";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category?: string;
};

export default function MenuManagement() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item", err);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = async (item: Item) => {
    const name = prompt("Enter new name:", item.name);
    if (name === null) return;

    const description = prompt("Enter new description:", item.description);
    if (description === null) return;

    const priceStr = prompt("Enter new price:", item.price.toString());
    if (priceStr === null) return;

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      alert("Invalid price");
      return;
    }

    const image_url = prompt("Enter new image URL:", item.image_url);
    if (image_url === null) return;

    try {
      const res = await api.put(`/items/${item.id}`, {
        name,
        description,
        price,
        image_url,
        category: item.category || "Uncategorized",
      });
      setItems(items.map((i) => (i.id === item.id ? res.data : i)));
    } catch (err) {
      console.error("Failed to edit item", err);
      alert("Failed to edit item.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Header / Banner */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaPlus /> Add Item
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-100 relative"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-44 w-full object-cover rounded-xl mb-4"
              />

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.name}
                </h3>
                {item.category && (
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
                    {item.category}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mb-3">{item.description}</p>
              <p className="font-bold text-orange-500 text-lg mb-3">
                R {item.price}
              </p>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition duration-300"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition duration-300"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onItemAdded={fetchItems}
      />
    </div>
  );
}
