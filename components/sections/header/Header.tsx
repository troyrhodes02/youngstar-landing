"use client";

import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); 

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
