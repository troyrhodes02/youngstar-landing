"use client";

import React from "react";
import { useTheme, useMediaQuery, Box } from "@mui/material";
import { CartDesktop } from "./CartDesktop";
import { CartMobile } from "./CartMobile";
import { Navbar } from "../../../components/sections/navbar/Navbar";

export default function CartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ bgcolor: 'black' }}>
      <Navbar alwaysWhite showSecureBanner={true} />
      <Box>
        {isMobile ? <CartMobile /> : <CartDesktop />}
      </Box>
    </Box>
  );
} 