"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, styled } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

type SizeKey = "SM" | "MD" | "LG" | "XL";

const sizeVariations: Record<SizeKey, string> = {
  SM: "KBTSKIACOTM7USKKEUTPQZZW",
  MD: "L7TSHDSKMHJHXI5SZ7F4ROER",
  LG: "DOCNVJWY4YTUSTLAUVLI5XAJ",
  XL: "3R3FJDBGTW3QYVDW6WKAP3DN",
};

const StyledButton = styled(Button)({
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#000",
  backgroundColor: "transparent",
  border: "1px solid #000",
  borderRadius: "4px",
  padding: "5px 10px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    color: "#000",
    border: "1px solid #000",
  },
});

const BuyNowButton = styled(({ isActive, ...props }: { isActive: boolean } & React.ComponentProps<typeof Button>) => (
  <Button {...props} />
))(({ isActive }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: isActive ? "#fff" : "#000",
  backgroundColor: isActive ? "#000" : "#fff",
  padding: "15px 30px",
  borderRadius: "8px",
  border: "1px solid #000",
  "&:hover": {
    backgroundColor: isActive ? "#333" : "#f5f5f5",
    color: isActive ? "#fff" : "#000",
  },
}));

export const FeaturedProductDesktop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeKey | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");

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
      }
    };

    fetchProductDetails();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
  };

  const handleBuyNow = async (variationId: string, size: string) => {
    try {
      const { data } = await axios.post("/api/square-checkout", {
        itemId: variationId,
        size,
      });

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to create checkout link.");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const getPosition = (index: number) => {
    const relativeIndex = (index - currentIndex + productImages.length) % productImages.length;
    switch (relativeIndex) {
      case 0:
        return { transform: "translateX(0)", zIndex: 3, opacity: 1, scale: 1 };
      case 1:
        return { transform: "translateX(350px) scale(0.8)", zIndex: 2, opacity: 0.8 };
      case 2:
        return { transform: "translateX(650px) scale(0.6)", zIndex: 1, opacity: 0.6 };
      case productImages.length - 1:
        return { transform: "translateX(-350px) scale(0.8)", zIndex: 2, opacity: 0.8 };
      case productImages.length - 2:
        return { transform: "translateX(-650px) scale(0.6)", zIndex: 1, opacity: 0.6 };
      default:
        return { transform: "scale(0)", opacity: 0, zIndex: 0 };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingY: "50px",
        width: "100%",
        margin: "auto",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "4rem",
          letterSpacing: "2px",
        }}
      >
        Featured Product
      </Typography>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1200px",
          height: "400px",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: "-250px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {productImages.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Image ${index + 1}`}
            sx={{
              position: "absolute",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              transition: "all 0.4s ease-in-out",
              ...getPosition(index),
            }}
          />
        ))}

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: "-250px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 4,
            backgroundColor: "fff",
            "&:hover": { backgroundColor: "#aaa3a3" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Typography
        sx={{
          marginTop: "25px",
          fontSize: "2rem",
          letterSpacing: "1.5px",
        }}
      >
        {productName || "Loading Product..."}
      </Typography>

      <Typography
        sx={{
          marginTop: "15px",
          fontSize: "2.5rem",
          letterSpacing: "3px",
        }}
      >
        {productPrice ? `$${(productPrice / 100).toFixed(2)}` : "Loading..."}
      </Typography>

      <Box sx={{ display: "flex", gap: "10px", marginY: "20px" }}>
        {Object.keys(sizeVariations).map((size) => (
          <StyledButton
            key={size}
            onClick={() => setSelectedSize(size as SizeKey)}
            sx={{
              backgroundColor: selectedSize === size ? "#000" : "transparent",
              color: selectedSize === size ? "#fff" : "#000",
            }}
          >
            {size}
          </StyledButton>
        ))}
      </Box>

      <BuyNowButton
        isActive={!!selectedSize}
        onClick={() => handleBuyNow(sizeVariations[selectedSize!], selectedSize!)}
        disabled={!selectedSize}
      >
        Buy Now
      </BuyNowButton>
    </Box>
  );
};
