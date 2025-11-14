import { ShoppingCart } from "lucide-react";

export default function Header({ totalItems, toggleCart }) {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <button
          onClick={toggleCart}
          className="relative bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>

          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
