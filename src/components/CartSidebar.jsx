import CartItem from "./CartItem";
import { X } from "lucide-react";

export default function CartSidebar({
  showCart,
  cart,
  totalItems,
  totalPrice,
  removeFromCart,
  updateQuantity,
  closeCart,
}) {
  return (
    <div
      className={`fixed top-0 z-60 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transition-transform ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={closeCart}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="px-6 text-gray-500">{totalItems} items</p>

        <div className="flex-1 p-6 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50 flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-2xl">${totalPrice}</span>
          </div>
        )}
      </div>
    </div>
  );
}
