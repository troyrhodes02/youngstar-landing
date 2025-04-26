"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  styled,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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

const ActionButton = styled(
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
  const theme = useTheme();
  const isXsScreen = useMediaQuery("(max-width:400px)");

  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<SizeKey | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<string>(
    "4XCQCJ6IZOHFRVDH5ZNHMIUQ",
  );
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
        alert("Failed to fetch product details. Please try again.");
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
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
      alert("Please select a size.");
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

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const adjustedPrice = productPrice ? (productPrice * quantity) / 100 : 0;

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: { xs: "10px 0", sm: "20px 0" },
        boxSizing: "border-box",
        overflow: "hidden",
        maxWidth: "100vw",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem" },
          letterSpacing: "1px",
          marginBottom: "15px",
          textAlign: "center",
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
          maxWidth: { xs: "280px", sm: "360px" },
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          pb: 1, // Add padding to bottom to ensure shadow is visible
        }}
      >
        {productImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 auto",
              width: { xs: "250px", sm: "300px" },
              height: { xs: "330px", sm: "400px" },
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
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          letterSpacing: "1.5px",
          textAlign: "center",
          px: 2,
        }}
      >
        {productName || "Loading Product..."}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          marginTop: "15px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            fontWeight: "bold",
          }}
        >
          Quantity
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "5px", sm: "10px" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              fontWeight: "bold",
              marginRight: { xs: "5px", sm: "10px" },
            }}
          >
            ${adjustedPrice.toFixed(2)}
          </Typography>
          <IconButton
            onClick={decrementQuantity}
            size={isXsScreen ? "small" : "medium"}
          >
            <RemoveIcon fontSize={isXsScreen ? "small" : "medium"} />
          </IconButton>
          <Typography
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              fontWeight: "bold",
            }}
          >
            {quantity}
          </Typography>
          <IconButton
            onClick={incrementQuantity}
            size={isXsScreen ? "small" : "medium"}
          >
            <AddIcon fontSize={isXsScreen ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "5px", sm: "10px" },
          marginY: { xs: "15px", sm: "20px" },
        }}
      >
        {Object.keys(sizeVariations).map((size) => (
          <StyledButton
            key={size}
            isSelected={selectedSize === size}
            onClick={() => setSelectedSize(size as SizeKey)}
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
              padding: { xs: "6px 12px", sm: "8px 16px" },
            }}
          >
            {size}
          </StyledButton>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: "10px", sm: "15px" },
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "0 10px", sm: "0" },
          boxSizing: "border-box",
        }}
      >
        <ActionButton
          isActive={!!selectedSize}
          onClick={handleAddToCart}
          fullWidth
          sx={{
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "280px", sm: "none" },
            fontSize: { xs: "1rem", sm: "1.2rem" },
            marginTop: { xs: "10px", sm: "15px" },
          }}
        >
          Add to Cart
        </ActionButton>

        <ActionButton
          isActive={false}
          onClick={handleBuyNow}
          disabled={!selectedSize}
          fullWidth
          sx={{
            width: { xs: "100%", sm: "auto" },
            maxWidth: { xs: "280px", sm: "none" },
            fontSize: { xs: "1rem", sm: "1.2rem" },
            marginTop: { xs: "10px", sm: "15px" },
            backgroundColor: "white",
            color: "#000",
          }}
        >
          Buy Now
        </ActionButton>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};
