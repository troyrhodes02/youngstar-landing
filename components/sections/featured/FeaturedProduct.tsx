"use client";

import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { FeaturedProductMobile } from "./FeaturedProductMobile";
import { FeaturedProductDesktop } from "./FeaturedProductDesktop";

export const FeaturedProduct: React.FC = () => {
  const theme = useTheme();
  // Use theme.breakpoints for consistency with MUI's responsive system
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <FeaturedProductMobile /> : <FeaturedProductDesktop />;
};
