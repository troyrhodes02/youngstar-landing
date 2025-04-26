"use client";

import React from "react";
import { Box, Badge, IconButton, useTheme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../src/context/CartContext";
import { useRouter } from "next/navigation";

type CartIconProps = {
  color?: string;
};

export const CartIcon: React.FC<CartIconProps> = ({ color = "inherit" }) => {
  const { totalItems } = useCart();
  const router = useRouter();
  const theme = useTheme();

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <IconButton
      aria-label="cart"
      onClick={handleCartClick}
      sx={{ color, position: "relative" }}
    >
      <Badge
        badgeContent={totalItems}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            fontSize: "0.7rem",
            fontWeight: "bold",
            minWidth: "18px",
            height: "18px",
            padding: "0 4px",
          },
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
      </Badge>
    </IconButton>
  );
}; 