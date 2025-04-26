"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, styled, TextField, useMediaQuery, useTheme, Snackbar, Alert } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useCart } from "../../../src/context/CartContext";
import { useRouter } from "next/navigation";

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

const AddToCartButton = styled(
  ({
    isActive,
    ...props
  }: { isActive: boolean } & React.ComponentProps<typeof Button>) => (
    <Button {...props} />
  ),
)(({ isActive }) => ({
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
  const theme = useTheme();
  const isLargeScreen = useMediaQuery('(min-width:1600px)');
  const isMediumScreen = useMediaQuery('(min-width:1200px) and (max-width:1599px)');
  const isSmallScreen = useMediaQuery('(min-width:900px) and (max-width:1199px)');
  const isXSmallScreen = useMediaQuery('(max-width:899px)');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<SizeKey | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productId, setProductId] = useState<string>("4XCQCJ6IZOHFRVDH5ZNHMIUQ");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.post("/api/square-product-details", {
          itemId: productId,
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
  }, [productId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + productImages.length) % productImages.length,
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice ?? 0,
      size: selectedSize,
      quantity: quantity,
      image: productImages[0] || "",
      variationId: sizeVariations[selectedSize],
    };

    addItem(cartItem);
    setSnackbarOpen(true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: productId,
      name: productName,
      price: productPrice ?? 0,
      size: selectedSize,
      quantity: quantity,
      image: productImages[0] || "",
      variationId: sizeVariations[selectedSize],
    };

    addItem(cartItem);
    router.push("/cart");
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const getPosition = (index: number) => {
    const relativeIndex =
      (index - currentIndex + productImages.length) % productImages.length;
      
    // Adjust scale and translation values based on screen size
    const scale = {
      large: { center: 1, side: 0.8, farSide: 0.6 },
      medium: { center: 1, side: 0.8, farSide: 0.6 },
      small: { center: 1, side: 0.75, farSide: 0.5 },
      xsmall: { center: 1, side: 0.7, farSide: 0 },
    };
    
    const translate = {
      large: { side: 350, farSide: 650 },
      medium: { side: 250, farSide: 450 },
      small: { side: 180, farSide: 320 },
      xsmall: { side: 150, farSide: 0 },
    };
    
    let currentScale, currentTranslate;
    
    if (isLargeScreen) {
      currentScale = scale.large;
      currentTranslate = translate.large;
    } else if (isMediumScreen) {
      currentScale = scale.medium;
      currentTranslate = translate.medium;
    } else if (isSmallScreen) {
      currentScale = scale.small;
      currentTranslate = translate.small;
    } else {
      currentScale = scale.xsmall;
      currentTranslate = translate.xsmall;
    }

    switch (relativeIndex) {
      case 0:
        return { transform: "translateX(0)", zIndex: 3, opacity: 1, scale: currentScale.center };
      case 1:
        return {
          transform: `translateX(${currentTranslate.side}px) scale(${currentScale.side})`,
          zIndex: 2,
          opacity: 0.8,
        };
      case 2:
        return {
          transform: `translateX(${currentTranslate.farSide}px) scale(${currentScale.farSide})`,
          zIndex: 1,
          opacity: 0.6,
        };
      case productImages.length - 1:
        return {
          transform: `translateX(-${currentTranslate.side}px) scale(${currentScale.side})`,
          zIndex: 2,
          opacity: 0.8,
        };
      case productImages.length - 2:
        return {
          transform: `translateX(-${currentTranslate.farSide}px) scale(${currentScale.farSide})`,
          zIndex: 1,
          opacity: 0.6,
        };
      default:
        return { transform: "scale(0)", opacity: 0, zIndex: 0 };
    }
  };

  const adjustedPrice = productPrice ? (productPrice * quantity) / 100 : 0;

  // Determine carousel container width and arrow positions based on screen size
  const getCarouselWidth = () => {
    if (isLargeScreen) return "80%";
    if (isMediumScreen) return "85%";
    if (isSmallScreen) return "90%";
    return "95%";
  };
  
  const getArrowPosition = () => {
    if (isLargeScreen) return { left: "5%", right: "5%" };
    if (isMediumScreen) return { left: "3%", right: "3%" };
    if (isSmallScreen) return { left: "2%", right: "2%" };
    return { left: "1%", right: "1%" };
  };

  const arrowPositions = getArrowPosition();

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
          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "3.5rem",
            lg: "4rem"
          },
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
          width: getCarouselWidth(),
          maxWidth: "1200px",
          height: {
            xs: "300px",
            sm: "350px",
            md: "400px",
          },
          mx: "auto",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: arrowPositions.left,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
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
              height: {
                xs: "300px",
                sm: "350px",
                md: "400px",
              },
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
            right: arrowPositions.right,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": { backgroundColor: "rgba(224, 224, 224, 1)" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Typography
        sx={{
          marginTop: "25px",
          fontSize: {
            xs: "1.5rem",
            sm: "1.75rem",
            md: "2rem",
          },
          letterSpacing: "1.5px",
        }}
      >
        {productName || "Loading Product..."}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Quantity
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              letterSpacing: "3px",
            }}
          >
            ${adjustedPrice.toFixed(2)}
          </Typography>

          <TextField
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            inputProps={{ min: 1, style: { textAlign: "center", fontSize: "1.2rem" } }}
            sx={{
              width: "80px",
              ".MuiInputBase-input": {
                textAlign: "center",
                fontSize: "1.2rem",
              },
            }}
          />
        </Box>
      </Box>

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

      <Box sx={{ display: "flex", gap: "15px" }}>
        <AddToCartButton
          isActive={!!selectedSize}
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          Add to Cart
        </AddToCartButton>
        
        <Button
          variant="outlined"
          onClick={handleBuyNow}
          disabled={!selectedSize}
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "15px 30px",
            borderRadius: "8px",
            border: "1px solid #000",
            color: "#000",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              border: "1px solid #000",
            },
          }}
        >
          Buy Now
        </Button>
      </Box>
      
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Item added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};
