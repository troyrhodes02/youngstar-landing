"use client";

import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

interface NavbarDesktopProps {
  alwaysWhite?: boolean;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({
  alwaysWhite = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!alwaysWhite) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [alwaysWhite]);
  const navbarBackgroundColor =
    alwaysWhite || isScrolled ? "white" : "transparent";
  const navbarTextColor = alwaysWhite || isScrolled ? "black" : "white";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: navbarBackgroundColor,
        transition: "background-color 0.3s ease",
        boxShadow:
          alwaysWhite || isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        color: navbarTextColor,
        height: "100px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1 }} />

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
            fontSize: "2.5rem",
            letterSpacing: "7px",
            color: "inherit",
          }}
        >
          YOUNGSTARWORLD
        </Typography>
        
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Link href="/" passHref>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "1.25rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link href="/lookbook" passHref>
            <Typography
              variant="body1"
              sx={{
                cursor: "pointer",
                textTransform: "uppercase",
                fontWeight: "500",
                fontSize: "1.25rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Lookbook
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
