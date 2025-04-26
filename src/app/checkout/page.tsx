"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { FaArrowLeft, FaShoppingCart, FaLock } from "react-icons/fa";
import axios from "axios";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    // Redirect if cart is empty
    if (cart.length === 0) {
      window.location.href = "/cart";
    }
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create array of items for Square checkout
      const squareItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const { data } = await axios.post("/api/square-checkout", {
        items: squareItems,
        customer: customerInfo,
      });

      if (data.checkoutUrl) {
        // Clear cart and redirect to Square checkout
        clearCart();
        window.location.href = data.checkoutUrl;
      } else {
        setError("Failed to create checkout link");
      }
    } catch (error: any) {
      console.error("Error creating checkout:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred while processing your request",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 pt-24">
      {/* Secure Checkout Banner */}
      <div className="w-full bg-red-600 py-3 mb-8 text-center text-white uppercase tracking-widest">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <FaLock className="mr-2" />
          <span className="font-bold">Secure Checkout</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase border-b-2 border-red-600 pb-2">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Customer Information Form */}
          <div className="w-full lg:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="bg-zinc-900 rounded-lg p-8 shadow-xl border border-zinc-800"
            >
              <h2 className="text-2xl font-bold uppercase tracking-wide mb-6 flex items-center">
                <span className="bg-red-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-3">
                  1
                </span>
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold uppercase tracking-wide mb-6 mt-10 flex items-center">
                <span className="bg-red-600 text-white rounded-full w-7 h-7 inline-flex items-center justify-center mr-3">
                  2
                </span>
                Shipping Address
              </h2>

              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm uppercase tracking-wide mb-2"
                >
                  Street Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={customerInfo.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    State*
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={customerInfo.state}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm uppercase tracking-wide mb-2"
                  >
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={customerInfo.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-zinc-700 bg-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-900 text-white font-medium rounded-md">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center mt-8">
                <Link
                  href="/cart"
                  className="flex items-center px-6 py-3 border border-zinc-700 text-sm font-bold uppercase tracking-wide rounded-md hover:bg-zinc-800 transition-all"
                >
                  <FaArrowLeft className="mr-2" /> Back to Cart
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wide rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all disabled:bg-red-900 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 overflow-hidden">
              <div className="p-6 bg-red-600">
                <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center">
                  <FaShoppingCart className="mr-3" /> Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="max-h-72 overflow-y-auto mb-6 pr-2 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex py-3 border-b border-zinc-800"
                    >
                      {item.image && (
                        <div className="flex-shrink-0 h-20 w-20 mr-4 bg-zinc-800 rounded-md overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-zinc-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-bold mt-1">
                          ${((item.price * item.quantity) / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-4 border-t border-zinc-800">
                  <div className="flex justify-between">
                    <p className="text-sm text-zinc-400">Subtotal</p>
                    <p className="text-sm font-medium">
                      ${(totalPrice / 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-zinc-400">Shipping</p>
                    <p className="text-sm font-medium">Calculated at payment</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-zinc-400">Tax</p>
                    <p className="text-sm font-medium">Calculated at payment</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-zinc-800 mt-4">
                  <p className="text-lg font-bold uppercase">Total</p>
                  <p className="text-lg font-bold text-red-600">
                    ${(totalPrice / 100).toFixed(2)}
                  </p>
                </div>

                <div className="mt-6 text-center text-xs text-zinc-400 flex items-center justify-center">
                  <FaLock className="mr-1" />
                  <span>Secure payment processing by Square</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
