"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { Section2Desktop } from "./Section2Desktop";
import { Section2Mobile } from "./Section2Mobile";

export const Section2 = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return isDesktop ? <Section2Desktop /> : <Section2Mobile />;
};
