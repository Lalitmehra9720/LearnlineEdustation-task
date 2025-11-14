import { Plus } from "lucide-react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:-translate-y-2 transition-all overflow-hidden">
      <div className="h-48 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="h-full object-contain" />
      </div>

      <div className="p-5">
        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {product.category}
        </span>

        <h3 className="text-lg font-bold text-gray-800 mt-2">{product.name}</h3>
        <p className="text-2xl font-bold text-purple-600 mb-4">${product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-green-700 text-white py-3 rounded-2xl font-semibold flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
