"use client";

import Link from "next/link";
import { ShoppingBag, Coffee } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function CustomerNavbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/customer" className="flex items-center space-x-2">
            <div className="bg-amber-500 p-1.5 rounded-lg">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-stone-800">CafeSystem</span>
          </Link>
          
          <Link href="/customer/cart" className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
            <ShoppingBag className="w-6 h-6 text-stone-600" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
