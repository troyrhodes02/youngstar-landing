"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { Section2Desktop } from "./Section2Desktop";
import { Section2Mobile } from "./Section2Mobile";

export const Section2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return isMobile ? <Section2Mobile /> : <Section2Desktop />;
};
