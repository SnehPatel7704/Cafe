import { CartProvider } from "@/context/CartContext";
import CustomerNavbar from "@/components/CustomerNavbar";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-50">
        <CustomerNavbar />
        {children}
      </div>
    </CartProvider>
  );
}
