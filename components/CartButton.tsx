"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../src/context/CartContext";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link 
      href="/cart" 
      className="relative flex items-center justify-center p-2"
      aria-label="Shopping Cart"
    >
      <FaShoppingCart className="text-xl" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
} 