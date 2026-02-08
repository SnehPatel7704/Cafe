"use client";

import { Order, OrderStatus } from "@/lib/types";
import { CheckCircle, Clock, ChefHat, Bell } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    preparing: "bg-blue-100 text-blue-800 border-blue-200",
    ready: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-gray-100 text-gray-600 border-gray-200",
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    preparing: <ChefHat className="w-4 h-4" />,
    ready: <Bell className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />,
  };

  const nextStatus: Record<OrderStatus, OrderStatus | null> = {
    pending: "preparing",
    preparing: "ready",
    ready: "completed",
    completed: null,
  };

  const nextActionLabel = {
    pending: "Start Preparing",
    preparing: "Mark Ready",
    ready: "Complete Order",
    completed: "Completed",
  };

  return (
    <div className={`border rounded-xl p-4 shadow-sm bg-white ${statusColors[order.status].replace('bg-', 'border-l-4 border-l-')}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-stone-800">#{order.id.slice(-4)}</h3>
          <p className="text-stone-600 font-medium">{order.customerName}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 uppercase ${statusColors[order.status]}`}>
          {statusIcons[order.status]}
          <span>{order.status}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm text-stone-600">
            <span>{item.quantity}x {item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-stone-100 pt-2 flex justify-between font-bold text-stone-800">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-stone-400 mb-4">
        <span>Ordered {new Date(order.createdAt).toLocaleTimeString()}</span>
      </div>

      {nextStatus[order.status] && (
        <button
          onClick={() => onStatusUpdate(order.id, nextStatus[order.status]!)}
          className="w-full py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors text-sm"
        >
          {nextActionLabel[order.status]}
        </button>
      )}
    </div>
  );
}
