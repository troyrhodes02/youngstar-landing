"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import { NewspaperHeaderDesktop } from "./NewspaperHeaderDesktop";
import { NewspaperHeaderMobile } from "./NewspaperHeaderMobile";

export const NewspaperHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return isMobile ? <NewspaperHeaderMobile /> : <NewspaperHeaderDesktop />;
};
