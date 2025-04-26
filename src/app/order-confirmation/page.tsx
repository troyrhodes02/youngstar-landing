"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaHome, FaShoppingBag } from "react-icons/fa";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  
  useEffect(() => {
    // Get order ID from URL params if available
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
    }
    
    // You could also fetch order details from your backend here if needed
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <FaCheckCircle className="mx-auto text-green-500 text-6xl" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. We've received your order and will process it shortly.
        </p>
        
        {orderId && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Order Reference</p>
            <p className="text-md font-medium">{orderId}</p>
          </div>
        )}
        
        <p className="text-md text-gray-600 mb-8">
          A confirmation email has been sent to your email address.
          If you have any questions about your order, please contact our customer support.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors"
          >
            <FaHome /> Return to Home
          </Link>
          
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors"
          >
            <FaShoppingBag /> Continue Shopping
          </Link>
        </div>
      </div>
      
      <div className="mt-12 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="text-indigo-600 font-bold text-lg mb-2">1. Order Processing</div>
            <p className="text-gray-600">
              We'll verify your order details and prepare your items for shipping.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="text-indigo-600 font-bold text-lg mb-2">2. Shipping</div>
            <p className="text-gray-600">
              Your order will be packed and shipped. You'll receive a tracking number via email.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="text-indigo-600 font-bold text-lg mb-2">3. Delivery</div>
            <p className="text-gray-600">
              Your package will arrive and you can enjoy your new products!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 