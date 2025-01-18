"use client";

import React from "react";
import { useMediaQuery } from "@mui/material";
import { FeaturedProductMobile } from "./FeaturedProductMobile";
import { FeaturedProductDesktop } from "./FeaturedProductDesktop";

export const FeaturedProduct: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 960px)");

  return isMobile ? <FeaturedProductMobile /> : <FeaturedProductDesktop />;
};
