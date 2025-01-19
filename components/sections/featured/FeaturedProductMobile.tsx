"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import axios from "axios";

type SizeKey = "SM" | "MD" | "LG" | "XL";

const sizeVariations: Record<SizeKey, string> = {
  SM: "KBTSKIACOTM7USKKEUTPQZZW",
  MD: "L7TSHDSKMHJHXI5SZ7F4ROER",
  LG: "DOCNVJWY4YTUSTLAUVLI5XAJ",
  XL: "3R3FJDBGTW3QYVDW6WKAP3DN",
};

const StyledButton = styled(
  ({
    isSelected,
    ...props
  }: { isSelected: boolean } & React.ComponentProps<typeof Button>) => (
    <Button {...props} />
  ),
)(({ isSelected }) => ({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: isSelected ? "#fff" : "#000",
  backgroundColor: isSelected ? "#000" : "transparent",
  border: "1px solid #000",
  borderRadius: "4px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: isSelected ? "#333" : "#f5f5f5",
    color: isSelected ? "#fff" : "#000",
  },
}));

const BuyNowButton = styled(
  ({
    isActive,
    ...props
  }: { isActive: boolean } & React.ComponentProps<typeof Button>) => (
    <Button {...props} />
  ),
)(({ isActive }) => ({
  fontSize: "1.2rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: isActive ? "#fff" : "#000",
  backgroundColor: isActive ? "#000" : "#fff",
  border: "2px solid #000",
  padding: "10px 20px",
  borderRadius: "4px",
  marginTop: "10px",
  "&:hover": {
    backgroundColor: isActive ? "#333" : "#f5f5f5",
    color: isActive ? "#fff" : "#000",
  },
}));

export const FeaturedProductMobile: React.FC = () => {
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<SizeKey | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post("/api/square-product-details", {
          itemId: "4XCQCJ6IZOHFRVDH5ZNHMIUQ",
        });

        const { images, price, name } = response.data;
        setProductImages(images);
        setProductPrice(price);
        setProductName(name);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to fetch product details. Please try again.");
      }
    };

    fetchProductDetails();
  }, []);

  const handleBuyNow = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    try {
      const { data } = await axios.post("/api/square-checkout", {
        itemId: sizeVariations[selectedSize],
        size: selectedSize,
      });

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to create checkout link.");
      }
    } catch (error) {
      console.error("Error creating checkout link:", error);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingY: "50px",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "2rem",
          letterSpacing: "1px",
          marginBottom: "20px",
        }}
      >
        Featured Product
      </Typography>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          width: "100%",
          maxWidth: "360px",
        }}
      >
        {productImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 auto",
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={`Product ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Box>

      <Typography
        sx={{
          marginTop: "20px",
          fontSize: "1.5rem",
          letterSpacing: "1.5px",
        }}
      >
        {productName || "Loading Product..."}
      </Typography>
      <Typography
        gutterBottom
        sx={{
          fontSize: "1.2rem",
        }}
      >
        {productPrice ? `$${(productPrice / 100).toFixed(2)}` : "Loading..."}
      </Typography>

      <Box sx={{ display: "flex", gap: "10px", marginY: "20px" }}>
        {Object.keys(sizeVariations).map((size) => (
          <StyledButton
            key={size}
            isSelected={selectedSize === size}
            onClick={() => setSelectedSize(size as SizeKey)}
          >
            {size}
          </StyledButton>
        ))}
      </Box>

      <BuyNowButton
        isActive={!!selectedSize}
        onClick={handleBuyNow}
        disabled={!selectedSize}
      >
        Buy Now
      </BuyNowButton>
    </Box>
  );
};
