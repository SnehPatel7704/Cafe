"use client";

import { MenuItem } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-stone-200 w-full relative">
        {/* Placeholder for image */}
        <div className="absolute inset-0 flex items-center justify-center text-stone-400">
          No Image
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-stone-800">{item.name}</h3>
          <span className="font-bold text-amber-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-stone-500 text-sm mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={() => addToCart(item)}
          className="w-full flex items-center justify-center space-x-2 bg-stone-900 text-white py-2 px-4 rounded-lg hover:bg-stone-800 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
