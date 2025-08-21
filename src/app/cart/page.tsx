"use client";

import { useState } from "react";

export default function CartPage() {
  // Later, replace this with global cart state or Context API
  const [cart, setCart] = useState([
    { id: 1, name: "Espresso", price: 5, qty: 2 },
    { id: 2, name: "Cappuccino", price: 6, qty: 1 },
  ]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty ☕</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{item.name} (x{item.qty})</span>
              <span className="font-semibold">${item.price * item.qty}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 text-xl font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>
          <button className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
