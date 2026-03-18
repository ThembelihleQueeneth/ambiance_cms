import { useEffect, useState } from "react";
import Header from "../components/Header";
import AddItemModal from "../components/AddItemModal";
import EditItemModal from "../components/EditItemModal";
import DeleteItemModal from "../components/DeleteItemModal";
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
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

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



  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Page Header / Banner */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500 w-full overflow-hidden">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Menu Management</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            <FaPlus /> Add New Item
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative group overflow-hidden flex flex-col h-full"
            >
              <div className="relative overflow-hidden rounded-xl mb-4 shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>

              <div className="flex justify-between items-start mb-2 shrink-0">
                <h3 className="font-bold text-lg text-gray-800 leading-tight">
                  {item.name}
                </h3>
                {item.category && (
                  <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full whitespace-nowrap ml-2 border border-orange-200">
                    {item.category}
                  </span>
                )}
              </div>

              <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">
                {item.description || "No description provided."}
              </p>
              
              <div className="flex justify-between items-end mb-4 shrink-0">
                <p className="font-extrabold text-gray-900 text-xl tracking-tight">
                  R {Number(item.price).toFixed(2)}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto shrink-0">
                <button
                  onClick={() => setEditingItem(item)}
                  className="flex-1 flex justify-center items-center gap-1.5 bg-gray-50 hover:bg-indigo-50 text-indigo-600 border border-indigo-100 hover:border-indigo-300 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  <FaEdit className="text-indigo-500" /> Edit
                </button>
                <button
                  onClick={() => setItemToDelete(item)}
                  className="flex-1 flex justify-center items-center gap-1.5 bg-gray-50 hover:bg-red-50 text-red-600 border border-red-100 hover:border-red-300 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                >
                  <FaTrash className="text-red-500" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {items.length === 0 && (
          <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-sm mt-8 pb-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPlus className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No menu items yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Get started by adding your first delicious item to the restaurant menu.</p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              <FaPlus /> Add Your First Item
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddItemModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onItemAdded={fetchItems}
      />
      
      <EditItemModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onItemUpdated={fetchItems}
        item={editingItem}
      />

      <DeleteItemModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onItemDeleted={fetchItems}
        item={itemToDelete}
      />
    </div>
  );
}
