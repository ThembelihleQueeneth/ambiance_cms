import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddItemModal from "../components/AddItemModal";
import api from "../services/api";

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

export default function MenuManagement() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);

  const fetchItems = async () => {
    const res = await api.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Menu Management</h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            + Add Item
          </button>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="h-40 w-full object-cover rounded-lg mb-3"
              />

              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="font-medium mt-2">R {item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <AddItemModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onItemAdded={fetchItems}
      />
    </div>
  );
}
