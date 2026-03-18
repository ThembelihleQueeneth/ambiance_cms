import { useEffect, useState } from "react";
import api from "../services/api";

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  items: {
    name: string;
  };
};

type Order = {
  id: string;
  customer_name: string;
  status: "pending" | "preparing" | "completed";
  total_price: number;
  order_items: OrderItem[];
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: Order["status"]) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const statusColor = (status: Order["status"]) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "preparing") return "bg-blue-100 text-blue-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow-md"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    {order.customer_name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Order ID: {order.id}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="mb-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <p>
                      {item.items?.name} × {item.quantity}
                    </p>
                    <p>R {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between font-bold text-lg mb-4">
                <p>Total</p>
                <p className="text-orange-500">
                  R {order.total_price.toFixed(2)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "preparing")
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Start Preparing
                  </button>
                )}

                {order.status === "preparing" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "completed")
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}