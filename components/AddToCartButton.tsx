"use client";

import React, { useState } from "react";
import { useCart } from "../src/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  size?: string;
  variationId?: string;
  className?: string;
};

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
  productImage,
  size = "ONE_SIZE",
  variationId,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      size: size,
      variationId: variationId,
      quantity: 1,
    });

    // Show animation effect
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-all ${
        isAdding ? "scale-95" : ""
      } ${className}`}
    >
      <FaShoppingCart />
      {isAdding ? "Added!" : "Add to Cart"}
    </button>
  );
}
