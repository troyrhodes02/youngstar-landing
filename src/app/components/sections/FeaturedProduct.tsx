"use client";

import React, { useState } from "react";
import { Box, Typography, Button, IconButton, styled } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  "/product-1.1.jpg",
  "/product-1.2.jpg",
  "/product-1.3.jpg",
  "/product-1.4.jpg",
  "/product-1.5.jpg",
];

const StyledButton = styled(Button)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textTransform: "uppercase",
  color: "#000",
  backgroundColor: "transparent",
  border: "2px solid #000",
  borderRadius: "0",
  padding: "10px 20px",
  position: "relative",
  "&:hover": {
    backgroundColor: "#f5f5f5",
    color: "#000",
    border: "2px solid #000", 
  },
});

export default function FeaturedProduct() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getPosition = (index: number) => {
    const relativeIndex = (index - currentIndex + images.length) % images.length;
    switch (relativeIndex) {
      case 0:
        return {
          transform: "translateX(0)",
          zIndex: 3,
          opacity: 1,
          scale: 1,
        };
      case 1:
        return {
          transform: "translateX(350px) scale(0.8)",
          zIndex: 2,
          opacity: 0.8,
        };
      case 2:
        return {
          transform: "translateX(650px) scale(0.6)",
          zIndex: 1,
          opacity: 0.6,
        };
      case images.length - 1:
        return {
          transform: "translateX(-350px) scale(0.8)",
          zIndex: 2,
          opacity: 0.8,
        };
      case images.length - 2:
        return {
          transform: "translateX(-650px) scale(0.6)",
          zIndex: 1,
          opacity: 0.6,
        };
      default:
        return {
          transform: "scale(0)",
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50px",
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

        {images.map((image, index) => (
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
          fontSize: "2.5rem",
          letterSpacing: "3px",
        }}
      >
        Graphic T-shirt
      </Typography>
      <Typography
        gutterBottom
        sx={{
          fontSize: "2rem",
        }}
      >
        $29.99
      </Typography>

      <StyledButton>Buy Now</StyledButton>
    </Box>
  );
}