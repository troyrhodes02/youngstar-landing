"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { NewspaperHeader } from "../../../components/sections/newspaper/header/NewspaperHeader";
import { Navbar } from "../../../components/sections/navbar/Navbar";
import { Section1 } from "../../../components/sections/newspaper/section1/Section1";
import { Section2 } from "../../../components/sections/newspaper/section2/Section2";

export default function Lookbook() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar alwaysWhite />
      {isLoading ? (
        <Stack
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          sx={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
            backgroundImage: "url('/white-texture.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingTop: { xs: "60px", sm: "70px", md: "75px", lg: "80px" },
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              maxWidth: "100vw",
              overflow: "hidden",
            }}
          >
            <NewspaperHeader />
            <Section1 />
            <Section2 />
          </Box>
        </Stack>
      )}
    </>
  );
}
