"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, ArrowLeft, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Mock Payment Gateway Delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: customerName || "Guest",
          items: cart,
          total,
        }),
      });

      if (response.ok) {
        clearCart();
        alert("Order placed successfully!");
        router.push("/customer");
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Your cart is empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          href="/customer"
          className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-stone-800 mb-8">Your Order</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden mb-8">
        <ul className="divide-y divide-stone-100">
          {cart.map((item) => (
            <li key={item.id} className="p-4 sm:p-6 flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-stone-800">{item.name}</h3>
                <p className="text-sm text-stone-500">${item.price.toFixed(2)} each</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-stone-200 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-stone-50 text-stone-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-stone-50 text-stone-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-stone-50 p-6 border-t border-stone-200">
          <div className="flex justify-between items-center text-lg font-bold text-stone-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
        <h2 className="text-lg font-bold text-stone-800 mb-4">Checkout Details</h2>
        
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
          />
        </div>

        <button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold hover:bg-stone-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>Pay & Place Order</span>
            </>
          )}
        </button>
        <p className="text-xs text-center text-stone-400 mt-4">
          This is a mock payment gateway. No actual money will be charged.
        </p>
      </div>
    </div>
  );
}
