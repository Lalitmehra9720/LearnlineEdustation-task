import { X, Minus, Plus } from "lucide-react";

export default function CartItem({ item, removeFromCart, updateQuantity }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-contain rounded"
          />

          <div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
        </div>

        <button onClick={() => removeFromCart(item.id)} className="text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center bg-white border rounded-lg">
          <button onClick={() => updateQuantity(item.id, -1)} className="p-2">
            <Minus className="w-4 h-4" />
          </button>

          <span className="px-3 font-semibold">{item.quantity}</span>

          <button onClick={() => updateQuantity(item.id, 1)} className="p-2">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <p className="text-lg font-bold">${item.price * item.quantity}</p>
      </div>
    </div>
  );
}
