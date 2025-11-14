import React, { useState, useMemo, useEffect } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
import Overlay from "./components/Overlay";
import { initialProducts } from "./data/products";

export default function ProductFilterCart() {

  // ----------------------------
  //  LOAD CART FROM LOCAL STORAGE
  // ----------------------------
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // ----------------------------
  //  SAVE CART TO LOCAL STORAGE
  // ----------------------------
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const categories = ["All", ...new Set(initialProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return selectedCategory === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // UPDATE QUANTITY
  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-200">
      {/* Header */}
      <Header totalItems={totalItems} toggleCart={() => setShowCart(!showCart)} />

      {/* Entire Product Area */}
      <div className="bg-zinc-100 py-10">
        <div className="max-w-7xl mx-auto px-4 bg-white rounded-2xl shadow-lg py-8">
          
          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Product Grid */}
          <ProductGrid products={filteredProducts} addToCart={addToCart} />

          {/* No product message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        showCart={showCart}
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        closeCart={() => setShowCart(false)}
      />

      {/* Overlay */}
      <Overlay show={showCart} close={() => setShowCart(false)} />
    </div>
  );
}
