"use client";

import { useEffect, useState } from "react";
import { Order, OrderStatus } from "@/lib/types";
import OrderCard from "@/components/OrderCard";
import { RefreshCcw } from "lucide-react";

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchOrders(); // Refresh immediately
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const activeOrders = orders.filter(o => o.status !== 'completed');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800">Staff Dashboard</h1>
          <button 
            onClick={fetchOrders}
            className="p-2 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
          >
            <RefreshCcw className="w-5 h-5 text-stone-600" />
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-800"></div>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-stone-700 mb-4 flex items-center gap-2">
                Active Orders
                <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">{activeOrders.length}</span>
              </h2>
              {activeOrders.length === 0 ? (
                <p className="text-stone-500 italic">No active orders.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {activeOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-bold text-stone-700 mb-4 flex items-center gap-2">
                Completed Orders
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{completedOrders.length}</span>
              </h2>
               {/* Only show last 5 completed orders to save space */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 opacity-75">
                {completedOrders.slice(0, 4).map((order) => (
                  <OrderCard key={order.id} order={order} onStatusUpdate={handleStatusUpdate} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
