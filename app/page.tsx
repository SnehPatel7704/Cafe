import Link from 'next/link';
import { Coffee, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">Cafe Ordering System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link 
          href="/customer"
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-amber-500 cursor-pointer group"
        >
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
            <Coffee className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">I am a Customer</h2>
          <p className="text-gray-500 mt-2 text-center">Browse menu and order food</p>
        </Link>

        <Link 
          href="/staff"
          className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500 cursor-pointer group"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <User className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">I am Staff</h2>
          <p className="text-gray-500 mt-2 text-center">View and manage orders</p>
        </Link>
      </div>
    </div>
  );
}
